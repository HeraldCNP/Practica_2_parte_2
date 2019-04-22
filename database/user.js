const mongoose = require("./connect");
var USERSCHEMA = {
    name: String,
    lastname: String,
    address: String,
    age: Number,
    nickname: String,
    password: String,
    registerDate: Date,
    updateDate: Date
}
const USER = mongoose.model("user", USERSCHEMA);

module.exports = { model: USER, schema: USERSCHEMA };