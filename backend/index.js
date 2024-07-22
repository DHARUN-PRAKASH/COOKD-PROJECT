require("./mongo")
const express = require('express')
const parser = require('body-parser')
const cors = require('cors')
const account = require('./account')
const recipe = require('./recipe')
const wishlist = require('./wishlist')
const { v4: uuidv4 } = require('uuid');



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

 exp.post('/postrecipe', async (req, res) => {
    try {
      // Create a new recipe with a unique ID
      const newRecipe = new recipe({
        ...req.body,
        recipeId: uuidv4() // Generate a unique recipe ID
      });
  
      await newRecipe.save();
      res.json({ message: `${newRecipe.recipeName} has been added` });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add recipe' });
    }
  });

// get recipe by id
exp.get('/:id',async(request,response)=>{
    const get = await recipe.findById(id=request.params.id)
    response.json(get)
})
// 

// get recipe by name

exp.get('/getrecipename/:name', async (req, res) => {
  try {
    const recipeName = req.params.name;
    const recipen = await recipe.findOne({ recipeName: recipeName });

    if (!recipen) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



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
exp.put('/update/:username/:wishlist', async (request, response) => {
    try {
      // Find the user by username
      const user = await account.findOne({ username: request.params.username });
  
      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }
  
      // Check if the recipeID is already in the wishlist
      const isRecipeInWishlist = user.wishlist.some(
        (item) => item.recipeID === request.params.wishlist
      );
  
      if (isRecipeInWishlist) {
        return response.status(400).json({ message: 'Recipe already in wishlist' });
      }
  
      const data = await account.updateOne(
        { username: request.params.username },
        { $push: { wishlist: { recipeID: request.params.wishlist } } }
      );
  
      response.json(data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Server error' });
    }
  });
  
// 

// pull wishlist delete the wishlist 

exp.put('/remove/:username/:wishlist', async (request, response) => {
    try {
      // Find the user by username
      const user = await account.findOne({ username: request.params.username });
  
      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }
  
      // Check if the recipeID is already in the wishlist
      const isRecipeInWishlist = user.wishlist.some(
        (item) => item.recipeID === request.params.wishlist
      );
  
      if (!isRecipeInWishlist) {
        return response.status(400).json({ message: 'Recipe not found in wishlist' });
      }
  
      // Remove the recipeID from the wishlist
      const data = await account.updateOne(
        { username: request.params.username },
        { $pull: { wishlist: { recipeID: request.params.wishlist } } }
      );
  
      response.json(data);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Server error' });
    }
  });
  

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