const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/ashur";
mongoose.connect(url, {useNewUrlParser: true});
const Schema = mongoose.Schema;

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });

var userSchema = new Schema({
    email: String,
    name: String,
    password: String
});
var postSchema = new Schema({
    email: String,
    topic: String,
    message: String
});

exports.accReg = function (email, name, password) {
    var Acc = mongoose.model('Register', userSchema)
    var acc = new Acc({email: email, name: name, password: password})
    acc.save()
    console.log("Acc registered")
};
exports.getAcc = function () {
    var Acc = mongoose.model('Register', userSchema)
    var register = Acc.find()
    return register;
};