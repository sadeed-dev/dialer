// import express from 'express';
// import cors from 'cors'; // <-- import cors

// import router from './routes/index.js';
// import dotenv from 'dotenv';
// import User from './models/user.model.js';




// dotenv.config();

// const app = express();

// app.use(cors({
//   origin: '*', 
//   credentials: true 
// }))


// app.use(express.json());


// // await User.sync({ alter: true }); 


// // Routes
// app.use('/api', router);

// app.listen(5000, () => {
//   console.log('Server running on http://localhost:5000');
// });

import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { startLeadWatcherJob } from './jobs/lead.watcher.js';
import { initWhatsAppBot } from './whatsapp-bot/whatsapp.bot.js';
import Lead from './models/lead.model.js';
import User from './models/user.model.js';

const app = express();

dotenv.config();

// ✅ Path utilities for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('✅ __dirname resolved to:', __dirname);

// ✅ Middleware configuration
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());



// ✅ Sync DB models if needed (use cautiously in production)
  // await Lead.sync({ alter: true }); // uncomment if migration needed
// await User.sync({ alter: true });
// await LoginLog.sync({alter: true})

// await Otp.sync({ alter: true }); 

// await LeadStatusHistory.sync({ alter: true }); // uncomment if migration needed

// await sequelize.sync({ alter: true }); // safely updates table structure

// ✅ API routes
app.use('/api', router);

// ✅ Serve static files from 'dist' folder (frontend build)
const distPath = path.join(__dirname, 'dist');
console.log('✅ Resolved dist path:', distPath);
app.use(express.static(distPath));


const indexPath = '/home/startupflora-dialer/htdocs/dialer.startupflora.co/dist/index.html';


app.get('*', (req, res) => {
  console.log('✅ Serving index.html for route:', req.originalUrl);

  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('❌ Error serving index.html:', err);
      res.status(500).send(err);
    } else {
      console.log('✅ index.html served successfully');
    }
  });
});


// ✅ Start server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  // 1️⃣ Start WhatsApp bot first
  initWhatsAppBot();
  // 2️⃣ Then start cron
  startLeadWatcherJob();


});
