import { Op } from 'sequelize';
import Lead from '../models/lead.model.js';
import LeadStatusHistory from '../models/leadStatusHistory.model.js';
import sequelize from '../config/db.js';
import { setHours, setMinutes, setSeconds } from "date-fns";
import axios from 'axios'
import dotenv from "dotenv";
import { sendMessageToGroup } from ".././whatsapp-bot/whatsapp.bot.js"; 
import fs from 'fs';
import csv from 'csv-parser';

dotenv.config();
export const getNextLead = async (userId) => {
  const lead = await Lead.findOne({
    where: {
      status: null,
      assigned_to: false, 
    },
    order: [['id', 'ASC']],
  });

  if (!lead) {
    return null; // no available leads
  }

  // Mark lead as assigned to current user
  await lead.update({ assigned_to: 1 });

  return lead;
};


// services/lead.service.js
export const updateLeadStatus = async ({ leadId, newStatus, remark, userId }) => {
  return await sequelize.transaction(async (t) => {
    const lead = await Lead.findByPk(leadId, { transaction: t });
    if (!lead) throw new Error('Lead not found');

    // Update main lead
    lead.status = newStatus;
    lead.remark = remark;
    lead.submitted_by = userId; // optional
    // lead.updatedAt = new Date(); // manually set timestamp
    await lead.save({ transaction: t });

    // Add to history
    await LeadStatusHistory.create({
      lead_id: leadId,
      status: newStatus,
      remark,
      changed_by: userId,
    }, { transaction: t });

    return lead;
  });
};




export const createLead = async (leadData) => {
  return await Lead.create(leadData);
};





export const handleGetSubmittedLeads = async (userId, filters = {}) => {
  const {
    search = "",
    status = "",
    page = 1,
    limit = 10,
  } = filters;

  const offset = (page - 1) * limit;

const now = new Date();
const todayStart = setSeconds(setMinutes(setHours(now, 8), 0), 0);   // 08:00:00 today
const todayEnd = setSeconds(setMinutes(setHours(now, 20), 0), 0);    // 20:00:00 today

  const where = {
    submitted_by: userId,
    status: {
      [Op.not]: null,
    },
  };

  if (search) {
    where[Op.or] = [
      { mobile_number: { [Op.like]: `%${search}%` } },
      { company_name: { [Op.like]: `%${search}%` } },
    ];
  }

  if (status) {
    where.status = status;
  }

  const [result, total] = await Promise.all([
    Lead.findAll({
      where,
      order: [['id', 'DESC']],
      limit: parseInt(limit),
      offset,
    }),
    Lead.count({ where }),
  ]);

  return {
    data: result,
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / limit),
  };
};




// export const handleGetSubmittedLeads = async (userId, filters = {}) => {
//   const {
//     search = "",
//     status = "",
//     page = 1,
//     limit = 10,
//   } = filters;

//   const offset = (page - 1) * limit;

//   const now = new Date();
//   const todayStart = setSeconds(setMinutes(setHours(now, 8), 0), 0);   // 08:00:00 today
//   const todayEnd = setSeconds(setMinutes(setHours(now, 20), 0), 0);    // 20:00:00 today

//   const where = {
//     submitted_by: userId,
//     status: {
//       [Op.not]: null,
//     },
//   };

//   // ✅ If no search, limit to today's updated leads
//   if (!search?.trim()) {
//     where.updatedAt = {
//       [Op.between]: [todayStart, todayEnd],
//     };
//   }

//   // ✅ Apply search if provided
//   if (search?.trim()) {
//     where[Op.or] = [
//       { mobile_number: { [Op.like]: `%${search}%` } },
//       { company_name: { [Op.like]: `%${search}%` } },
//     ];
//   }

//   if (status) {
//     where.status = status;
//   }

//   const [result, total] = await Promise.all([
//     Lead.findAll({
//       where,
//       order: [["id", "DESC"]],
//       limit: parseInt(limit),
//       offset,
//     }),
//     Lead.count({ where }),
//   ]);

//   return {
//     data: result,
//     total,
//     page: parseInt(page),
//     limit: parseInt(limit),
//     totalPages: Math.ceil(total / limit),
//   };
// };



export const handleGetLeadById = async (id) => {
  const lead = await Lead.findByPk(id);
  if (!lead) {
    throw new Error("Lead not found");
  }
  return lead;
};


//code for check Remaining Leads And Notify on whatsapp



let alertSent = false;

export const checkRemainingLeadsAndNotify = async () => {
  try {
    const count = await Lead.count({
      where: {
        assigned_to: 0,
      },
    });

    console.log(`🧮 Unassigned leads: ${count}`);

    if (count <= 500 && !alertSent) {
   const message = `⚠️ Only *${count}* leads remaining! 📉`;
      await sendMessageToGroup("dialer_queries", message); 

      alertSent = true;
    } else if (count > 500) {
      alertSent = false;
    }
  } catch (err) {
    console.error("❌ Error during group message send:", err.message);
  }
};





export const bulkInsertLeads = (filePath) => {
  return new Promise((resolve, reject) => {
    const leads = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        leads.push({
          mobile_number: row.mobile_number || null,
          company_name: row.company_name?.trim() || null,
          owner_name: row.owner_name?.trim() || null,
          turnover: row.turnover?.trim() || null,
          servicing: row.servicing?.trim() || null,
          type: row.type?.trim() || null,
          submitted_by: row.submitted_by ? Number(row.submitted_by) : null,
          assigned_to: row.assigned_to === 'true',
          status: row.status?.trim() || null,
          remark: row.remark?.trim() || null,
        });
      })
      .on('end', async () => {
        try {
          const validLeads = leads.filter(l => l.mobile_number);
          await Lead.bulkCreate(validLeads, { ignoreDuplicates: true });
          fs.unlinkSync(filePath); // cleanup
          resolve(validLeads.length);
        } catch (err) {
          reject(err);
        }
      })
      .on('error', reject);
  });
};
