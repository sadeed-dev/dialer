import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import LeadStatusHistory from './leadStatusHistory.model.js'; 

const Lead = sequelize.define('Lead', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  mobile_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company_name: DataTypes.STRING,
  owner_name: DataTypes.STRING,
  turnover: DataTypes.STRING,
  servicing: DataTypes.STRING,
  type: DataTypes.STRING,
  submitted_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
 assigned_to: {
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: false,
},

  status: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  
  remark: DataTypes.STRING,

},
 {
  tableName: 'leads',
  timestamps: true,    // adds createdAt and updatedAt
  paranoid: true,      // adds deletedAt for soft delete
});

Lead.hasMany(LeadStatusHistory, { foreignKey: 'lead_id', as: 'statusHistory' });
LeadStatusHistory.belongsTo(Lead, { foreignKey: 'lead_id' });


// ✅ Add this here (AFTER associations, BEFORE export)
Lead.prototype.toJSON = function () {
  return { ...this.get() };  // Includes all fields including createdAt, updatedAt
};

export default Lead;
