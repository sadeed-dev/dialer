// import { DataTypes } from 'sequelize';
// import sequelize from '../config/db.js';

// const User = sequelize.define('User', {
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// }, {
//   tableName: 'users',
//   timestamps: false, // ✅ disables createdAt and updatedAt columns
// });


// export default User;



// Example Sequelize User model

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  microsoftId: {
    type: DataTypes.STRING,
    unique: true, // Ensure no duplicates for same MS user
  },
  email: {
    type: DataTypes.STRING,
  },
  name: DataTypes.STRING,
  
  role: {
  type: DataTypes.ENUM('USER', 'ADMIN', 'SUPERADMIN'),
  defaultValue: 'USER',
  allowNull: false,
},

   mobile: {
    type: DataTypes.STRING,
    unique: true,
  },
  // You can add more fields like profile picture, department, etc.
}, {
  tableName: 'users',
  timestamps: true,
});

export default User;
