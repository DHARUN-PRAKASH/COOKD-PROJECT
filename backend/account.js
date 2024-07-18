const mongoose = require('mongoose')

var accountSchema=new mongoose.Schema({
    username:{type:String},
    password:{type:String},
    fullname:{type:String},
    contact:{type:Number},
})

const account = mongoose.model('account',accountSchema)
module.exports=account