import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const LoginLog = sequelize.define('LoginLog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  loginTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: 'success',
  }

}, {
  tableName: 'login_logs',
  timestamps: false,
});

export default LoginLog;
