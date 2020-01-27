const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dareRoutes = require("./api/routes/dares");
const userRoutes = require('./api/routes/users');

mongoose.connect(process.env.DAREME_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.Promise = global.Promise;
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function callback () {
    console.log("h");
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Route handle requests
app.use("/dares", dareRoutes);
app.use("/users", userRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
