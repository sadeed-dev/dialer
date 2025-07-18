import * as leadService from '../services/lead.service.js';

export const fetchNextLead = async (req, res) => {
  try {
    const userId = req.user.id; // assuming auth middleware sets req.user
    const lead = await leadService.getNextLead(userId);

    // if (!lead) {
    //   return res.status(404).json({ message: "No available leads" });
    // }

    res.json(lead);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateLeadStatus = async (req, res) => {
      const { status, remark } = req.body;
   const leadId = req.params.id;
    const userId = req.user?.id; 

  try {
    const lead = await leadService.updateLeadStatus({ leadId, newStatus: status, remark, userId });
    res.json({ message: "Status updated successfully", lead });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const createLead = async (req, res) => {
  try {
    const newLead = await leadService.createLead(req.body);
    res.json(newLead);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



export const getSubmittedLeads = async (req, res) => {
 try {
    const userId = req.user.id; // ✅ assuming you have auth middleware attaching user

    const { page, limit, search, status } = req.query;

    const filters = {
      page,
      limit,
      search,
      status,
    };

    const data = await leadService.handleGetSubmittedLeads(userId, filters);

    res.json({
      success: true,
      message: "Submitted leads fetched successfully",
      ...data,
    });
  } catch (err) {
    console.error("Error fetching submitted leads:", err);
    res.status(500).json({
      success: false,
      message: "Server error fetching submitted leads",
    });
  }
};



export const getLeadById = async (req, res) => {
  const { id } = req.params;

  try {
    const lead = await leadService.handleGetLeadById(id);
    res.json(lead)
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: err.message || "Lead not found" });
  }
};



import { bulkInsertLeads } from '../services/lead.service.js';

export const uploadLeadsFromCSV = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const insertedCount = await bulkInsertLeads(req.file.path);
    res.status(200).json({ message: `${insertedCount} leads inserted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





