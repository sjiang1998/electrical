const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/electrical');

var ReceptionSchema = mongoose.Schema({
    cname: String,
    ctele: String,
    caddress: String,
    ctime: Date
});


module.exports = mongoose.model('Reception', ReceptionSchema);

