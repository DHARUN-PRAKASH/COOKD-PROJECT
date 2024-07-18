require("./mongo")
const express = require('express')
const parser = require('body-parser')
const cors = require('cors')
const account = require('./account')
const recipe = require('./recipe')
const wishlist = require('./wishlist')


const exp = express()
exp.use(cors())
exp.use(parser.urlencoded({extended:true}))
exp.use(parser.json())


exp.post('/signup',async(request,response)=>{
    const newAccount = new account(request.body)
    await newAccount.save()
    response.json({"message":newAccount.username+" has opened"})
})

exp.post('/signin', async (req, res) => {
    const { username, password } = req.body;

        const user = await account.findOne({ username, password });
        if (user) {
            const userWishlist = await wishlist.findOne({ username });
            const response = {
                username: user.username,
                wishlist: userWishlist ? userWishlist.recipeId : [] 
            };
            res.json(response);
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
});


exp.post('/postrecipe',async(request,response)=>{
    const newRecipe = new recipe(request.body)
    await newRecipe.save()
    response.json({"message":newRecipe.recipeName+" has added"})
})

// get recipe by id
exp.get('/:id',async(request,response)=>{
    const get = await recipe.findById(id=request.params.id)
    response.json(get)
})
// 

// get recipe

exp.get('/',async(request,response)=>{
    const tracks = await recipe.find()
    response.json(tracks)
})
// 



exp.listen(1111,()=>{
    console.log("Express connected!!!")
})