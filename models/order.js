const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/electrical');

var OrderSchema = mongoose.Schema({
    goodId: String,
    goodname: String,
    goodnum: Number,
    goodtime: {
        type: Date,
        default: Date.now
    },
    goodstatus: {
        type: String,
        default: "已下单"
    },
    price: Number,
    cname: String,
    ctele: String,
    caddress: String,
    sname: String,
    fname: String,
    faddress: {
        type: String,
        default: "未知"
    },
    cost: {
        type: Number,
        default: 0
    }

}, {
        versionKey: false,
        timestamps: { createdAt: 'goodtime' }
    });


module.exports = mongoose.model('Order', OrderSchema);

