const mongoose = require('../database/db');
const Schema = mongoose.Schema;

var crypto_exchange = new Schema({
    exchange_id: {
        type: String,
    },
    website: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    data_quote_start: {
        type: Date,
    },
    data_quote_end: {
        type: Date
    },
    data_orderbook_start: {
        type: Date,
    },
    data_orderbook_end: {
        type: Date
    },
    data_trade_start: {
        type: Date,
    },
    data_trade_end: {
        type: Date
    },
    data_symbols_count: {
        type: Number,
    },
    volume_1hrs_usd: {
        type: String
    },
    volume_1day_usd: {
        type: String
    },
    volume_1mth_usd: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true
});

const Crypto_exchange = mongoose.model('Crypto_exchange', crypto_exchange);
module.exports = Crypto_exchange;