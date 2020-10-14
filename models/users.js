const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/electrical');

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    role: String,
    status: {
        type: Number,
        enum: [0, 1],
        default: 1
    },
    regdate: Date
});


module.exports = mongoose.model('User', UserSchema);

