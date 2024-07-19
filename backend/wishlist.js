const mongoose = require('mongoose')

var wishlistSchema=new mongoose.Schema({
    username:{type:String},
    recipeId: [{ type:Number}]

})

const wishlists = mongoose.model('wishlist',wishlistSchema)
module.exports=wishlists