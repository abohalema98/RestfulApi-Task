const mongoose = require('mongoose');

// Connect to DB

const DB_CONNECTION = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('Connected to DB!');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}


module.exports = DB_CONNECTION