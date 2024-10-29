const mongoose = require('mongoose');

// Log Model Schema
const LogSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true,
        enum: ['debug', 'info', 'warn', 'error', 'fatal']
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Log = mongoose.model('Log', LogSchema);
export default Log;