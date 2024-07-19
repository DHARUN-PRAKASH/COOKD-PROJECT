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
exp.post('/signin',async(req,res)=>{
    try{
      const user = req.body.username
     const pass = req.body.password
     const preuser = await account.findOne({'$and':[{"username":{'$eq':user}},{"password":{'$eq':pass}}]})
     if(preuser){
         const cred = {
             "username":user,
             "password":pass
         }
         res.json(cred)
     }
     else{
         response.json({"message":"error"})
     }
    }catch(err){
     res.status(500).json({"error":err})
    }
 })

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

// // put wishlist
// exp.put('/update/:username/:wishlist',async(request,response)=>{
//     const data = await account.updateOne({username:{'$eq':request.params.username}},{ $push: { wishlist: request.params.wishlist }})
//     response.json(data)
// })
// 

// put wishlist try
exp.put('/update/:username/:wishlist',async(request,response)=>{
    const data = await account.updateMany({ username: { $eq: request.params.username } },
        { $push: { wishlist: { recipeID:  request.params.wishlist} } })
    response.json(data)
})
// 

// get wishlist username 
exp.get('/getwishlist/:username', async (request, response) => {
    try {
        const data = await account.findOne({ username: request.params.username });
        if (!data) {
            return response.status(404).json({ error: 'User not found' });
        }
        const recipeIds = data.wishlist.map(item => item.recipeID);

        const recipes = await recipe.find({ recipeId: { $in: recipeIds } });

        response.json(recipes);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal server error' });
    }
});
// 

// get wishlist recipe 


// exp.get('/getwishlistrecipe/:username', async (req, res) => {

//       // Find the user's account
//       const data = await account.findOne({ username: request.params.username }).populate('wishlist');
//       wishlist=data.wishlist
      

      

//   });







// 







exp.listen(1111,()=>{
    console.log("Express connected!!!")
})