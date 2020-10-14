const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/electrical');

var FactorySchema = mongoose.Schema({
    fname: String,
    gname: String,
    faddress: String,
    fcost: Number
});


module.exports = mongoose.model('Factory', FactorySchema);

