import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize('leadsdb', 'root', '', {
//   host: '127.0.0.1',
//   dialect: 'mysql',
//   logging: false 

// });

const sequelize = new Sequelize('dialer', 'shooter', 'Startup@Shooter@2025', {
  host: '15.235.163.14',
  port: 3306, // ✅ explicitly mention port if non-default
  dialect: 'mysql',
  logging: false, // disable logging if not needed
});


try {
  await sequelize.authenticate();
  console.log(' MySQL connected from cloud url');
} catch (error) {
  console.error('DB Connection Error:', error); 
}

export default sequelize;
