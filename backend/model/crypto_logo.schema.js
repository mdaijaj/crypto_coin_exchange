const mongoose = require('../database/db');
const Schema = mongoose.Schema;

var crypto_logo = new Schema({
    exchange_id: {
        type: String,
    },
    url: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true
});

const Crypto_logo = mongoose.model('Crypto_logo', crypto_logo);
module.exports = Crypto_logo;