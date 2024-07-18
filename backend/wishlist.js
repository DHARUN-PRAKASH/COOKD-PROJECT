const mongoose = require('mongoose')

var wishliSchema=new mongoose.Schema({
    username:{type:String},
    recipeId: [{ type:Number}]

})

const wishlist = mongoose.model('wishlist',wishliSchema)
module.exports=wishlist