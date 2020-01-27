const mongoose = require('mongoose');

const dareSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    username: String,
    open_title: String,
    open_description: String,
    open_pic_url: String,
    wanted_profit: Number,
    amount: Number



    // id: mongoose.Schema.Types.ObjectId,
    // user_id: { type: String, required: true },
    // status: { type: String, default: "open" },

    // // OPEN
    // open_title: { type: String, required: true },
    // open_description: { type: String, required: true },
    // open_pic: { type: String },
    // open_posting_date: { type: Date, required: true },
    // wanted_profit: { type: Number, require: true },
    // bidders: [],

    // // IN PROGRESS
    // ip_starting_date: { type: Date },

    // // COMPLETED
    // completed_date: { type: Date },
    // completed_pic: { type: String },
    // completed_description: { type: String, required: true },
    // completed_votes: []

    // Status Types
    // "open", "ip", "completed", and "bailed"
    // Voting TYPES
    // "Ney" = -1, "Mey" = 0, "Yey" = 1
});

module.exports = mongoose.model('Dare', dareSchema);