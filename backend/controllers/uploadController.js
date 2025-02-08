const XMLParserService = require('../services/xmlParser');
const Report = require('../models/Report');
const fs = require('fs').promises;

class UploadController {
  static async uploadAndProcessXML(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      console.log('Uploaded File:', req.file);

      const filePath = req.file.path;
      const reportData = await XMLParserService.parseXMLFile(filePath);
      
      const report = new Report(reportData);
      await report.save();

      res.status(201).json({
        message: 'Report processed successfully',
        reportId: report._id,
        report: reportData
      });
    } catch (error) {
      if (req.file) {
        await fs.unlink(req.file.path).catch(console.error);
      }
      res.status(500).json({
        error: 'Error processing XML file',
        details: error.message
      });
    }
  }
}

module.exports = UploadController;