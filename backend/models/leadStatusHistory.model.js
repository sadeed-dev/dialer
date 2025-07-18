// models/leadStatusHistory.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const LeadStatusHistory = sequelize.define('LeadStatusHistory', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  lead_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'leads', key: 'id' },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  remark: {
    type: DataTypes.STRING,
  },
  changed_by: {
    type: DataTypes.INTEGER, // optional: ID of the user who made the change
  },
}, {
  tableName: 'lead_status_history',
  timestamps: true,     // ✅ Adds createdAt and updatedAt
  paranoid: true,       // ✅ Adds deletedAt and enables soft delete
});

export default LeadStatusHistory;
