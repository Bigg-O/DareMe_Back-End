const mongoose = require('mongoose');

const dareSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: { type: String, required: true },
    status: { type: String, default: "open" },

    // OPEN
    open_title: { type: String, required: true },
    open_description: { type: String, required: true },
    open_pic: { type: String },
    wanted_profit: { type: Number, require: true },
    bidders: [],
    open_posting_date: { type: Date, required: true },

    // IN PROGRESS
    ip_starting_date: { type: Date },

    // COMPLETED
    completed_date: { type: Date },
    completed_pic: { type: String },
    completed_description: { type: String, required: true },
    // completed_votes: []

    // Status Types
    // "open", "ip", "completed", and "bailed"
    // Voting TYPES
    // "Ney" = -1, "Mey" = 0, "Yey" = 1
});

module.exports = mongoose.model('Dare', dareSchema);