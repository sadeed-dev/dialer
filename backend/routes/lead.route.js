import express from 'express';
import { fetchNextLead, updateLeadStatus, createLead, getSubmittedLeads, getLeadById} from '../controllers/lead.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { uploadLeadsFromCSV } from '../controllers/lead.controller.js';
import multer from 'multer';

const router = express.Router();

router.get('/next',authMiddleware, fetchNextLead);
router.put('/:id/status',authMiddleware, updateLeadStatus);
router.get('/submitted',authMiddleware, getSubmittedLeads);
router.post('/', createLead);
router.get('/:id', authMiddleware, getLeadById); // ✅ new route


const upload = multer({ dest: 'uploads/' });

router.post('/upload-csv', upload.single('file'), uploadLeadsFromCSV);


export default router;
    