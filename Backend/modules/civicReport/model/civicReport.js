const mongoose = require('mongoose');

const CivicReportSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    imageUrl: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'resolved', 'rejected'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    history: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            status: {
                type: String,
                enum: ['pending', 'in_progress', 'resolved', 'rejected'],
                required: true
            }
        }
    ]
}, {
    timestamps: true
});
// Create a 2dsphere index for geospatial queries
CivicReportSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('CivicReport', CivicReportSchema);