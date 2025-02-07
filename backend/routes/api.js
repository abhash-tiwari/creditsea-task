const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const UploadController = require('../controllers/uploadController');
const ReportController = require('../controllers/reportController');

// Upload routes
router.post('/upload', upload.single('file'), UploadController.uploadAndProcessXML);

// Report routes
router.get('/reports', ReportController.getAllReports);
router.get('/reports/:id', ReportController.getReportById);

module.exports = router;