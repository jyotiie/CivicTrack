const CivicReport = require('../model/civicReport');

// Get all civic reports
async function getAllReports() {
    return await CivicReport.find();
}

// Get a single report by ID
async function getReportById(id) {
    return await CivicReport.findById(id);
}

// Create a new report
async function createReport(reportData) {
    const report = new CivicReport(reportData);
    return await report.save();
}

// Update a report by ID
async function updateReport(id, updateData) {
    return await CivicReport.findByIdAndUpdate(id, updateData, { new: true });
}

// Delete a report by ID
async function deleteReport(id) {
    return await CivicReport.findByIdAndDelete(id);
}

module.exports = {
    getAllReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport
};
