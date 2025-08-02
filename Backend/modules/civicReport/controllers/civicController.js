'use strict';

const logging = require('../../../logging/logging');
const civicReportService = require('../services/civicReportServices.js');
const responses = require('../../../responses/responses');

// Get all civic reports
exports.getAllReports = async (req, res) => {
    try {
        const reports = await civicReportService.getAllReports();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports', error });
    }
};

exports.getReportById = async (req, res) => {
    try {
        const report = await civicReportService.getReportById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching report', error });
    }
};

exports.createReport = async (req, res) => {
    try {
        const savedReport = await civicReportService.createReport(req.body);
        res.status(201).json(savedReport);
    } catch (error) {
        res.status(400).json({ message: 'Error creating report', error });
    }
};

exports.updateReport = async (req, res) => {
    try {
        const updatedReport = await civicReportService.updateReport(req.params.id, req.body);
        if (!updatedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(updatedReport);
    } catch (error) {
        res.status(400).json({ message: 'Error updating report', error });
    }
};

exports.deleteReport = async (req, res) => {
    try {
        const deletedReport = await civicReportService.deleteReport(req.params.id);
        if (!deletedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting report', error });
    }
};


exports.getReportsWithinRadius = async (req, res , area) => {
    try {
        const { latitude, longitude } = req.query;
        if (!latitude || !longitude) {
            return res.status(400).json({ message: 'Latitude and longitude are required' });
        }

        const reports = await civicReportService.getAllReports();
        const toRad = (value) => (value * Math.PI) / 180;
        const earthRadiusKm = 6371;

        const filteredReports = reports.filter(report => {
            if (!report.location || typeof report.location.latitude !== 'number' || typeof report.location.longitude !== 'number') {
                return false;
            }
            const dLat = toRad(report.location.latitude - parseFloat(latitude));
            const dLon = toRad(report.location.longitude - parseFloat(longitude));
            const lat1 = toRad(parseFloat(latitude));
            const lat2 = toRad(report.location.latitude);

            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = earthRadiusKm * c;

            return distance <= area;
        });

        res.status(200).json(filteredReports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports within radius', error });
    }
};