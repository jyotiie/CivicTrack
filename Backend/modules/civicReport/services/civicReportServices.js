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
    // Ensure history is initialized as an empty array, since it should not come from the request
    reportData.history = [];
    reportData.history.push({
        date: new Date(),
        status: reportData.status
    });
    let newReport = { ...reportData };
    newReport.location = {
        type: 'Point',
        coordinates: [reportData.location.longitude, reportData.location.latitude]
    };

    const report = new CivicReport(newReport);
    return await report.save();
}

// Update a report by ID
async function updateReport(id, updateData) {
    const report = await CivicReport.findById(id);
    if (!report) {
        throw new Error('Report not found');
    }
    if (updateData.status && updateData.status !== report.status) {
        report.history.push({
            date: new Date(),
            status: updateData.status
        });
        updateData.history = report.history;
    }
    return await CivicReport.findByIdAndUpdate(id, updateData, { new: true });
}

async function getReportsWithinRadius(radiusInMeters, latitude, longitude) {
    const reports = await CivicReport.find({
        location: {
            $near: {
                $geometry: { type: "Point", coordinates: [longitude, latitude] },
                $maxDistance: radiusInMeters
            }
        }
    });
   return reports;
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
    deleteReport,
    getReportsWithinRadius
};
