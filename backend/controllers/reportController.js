const Report = require('../models/Report');

class ReportController {
    static async getAllReports(req, res) {
        try {
          const { page = 1, limit = 10 } = req.query;
          const skip = (page - 1) * limit;
          const totalReports = await Report.countDocuments();
    
          const reports = await Report.find()
            .select('-__v')
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .skip(Number(skip));
    
          res.json({
            reports,
            totalPages: Math.ceil(totalReports / limit),
            currentPage: Number(page)
          });
        } catch (error) {
          res.status(500).json({ error: 'Error fetching reports', details: error.message });
        }
      }

  static async getReportById(req, res) {
    try {
      const report = await Report.findById(req.params.id)
        .select('-__v');
      
      if (!report) {
        return res.status(404).json({
          error: 'Report not found'
        });
      }
      
      res.json(report);
    } catch (error) {
      res.status(500).json({
        error: 'Error fetching report',
        details: error.message
      });
    }
  }
}

module.exports = ReportController;