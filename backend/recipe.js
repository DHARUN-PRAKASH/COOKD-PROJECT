const mongoose = require('mongoose')

var recipeSchema=new mongoose.Schema({
    recipeId: {type:String},
    recipeName: {type:String},
    cuisine: {type:String},
    ingrediant:[{  type:String}],
    duration: {type:String},
    type: {type:String},

})

const recipe = mongoose.model('recipe',recipeSchema)
module.exports=recipe