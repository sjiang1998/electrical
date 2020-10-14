const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/electrical');

var GoodSchema = mongoose.Schema({
    fname: String,
    gname: String,
    gInfo: String,
    gparams: [
        {
            modeln: String,
            warrantly: String,
            pconsum: String
        }
    ],
    gtype: String,
    gprice: String,
    gImgurl: String

});


module.exports = mongoose.model('Good', GoodSchema);

