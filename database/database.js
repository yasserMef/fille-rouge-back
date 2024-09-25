const mongoose = require("mongoose");


const database =()=> mongoose.connect(process.env.URI)
    .then(conn => console.log(`Connected to MongoDB at host: ${conn.connection.host}`))
    .catch(err => {
        console.log(`Error connecting to MongoDB: ${err}`);
        process.exit(1);
    });

module.exports = database;
