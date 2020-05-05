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
    name: String,
    topic: String,
    message: String
});
exports.postThread = function (name, topic, text) {
    var Thread = mongoose.model('Thread', postSchema)
    var thread = new Thread({name: name, topic: topic, message: text})
    thread.save()
    console.log("Thread posted")
};

exports.getThreads = function () {
    var Thread = mongoose.model('Thread', postSchema)
    var threads = Thread.find()
    return threads;

};
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