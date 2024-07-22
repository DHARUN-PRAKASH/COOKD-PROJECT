import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dial from './speeddial';
import { updateWishlist } from './axios'; 
import Dash from './dash';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});
  const [wishlistRecipes, setWishListRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await axios.get('http://localhost:1111/');
      setRecipes(response.data);
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const user = sessionStorage.getItem('logged');
    const desiredUsername = JSON.parse(user).username;
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`http://localhost:1111/getwishlist/${desiredUsername}`);
        setWishListRecipes(response.data);
      } catch (error) {
        console.error('Error fetching wishlist recipes:', error);
      }
    };

    fetchWishlist();
  }, []);

  const handleExpandClick = (recipeId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [recipeId]: !prev[recipeId],
    }));
  };

  const handleWishlist = async (recipeId) => {
    const user = sessionStorage.getItem('logged');
    const username = JSON.parse(user).username;

    try {
      const isRecipeInWishlist = wishlistRecipes.some(item => item.recipeId === recipeId);

      if (isRecipeInWishlist) {
        // Remove from wishlist
        await axios.put(`http://localhost:1111/remove/${username}/${recipeId}`);
        setWishListRecipes(wishlistRecipes.filter(item => item.recipeId !== recipeId));
      } else {
        // Add to wishlist
        await updateWishlist(username, recipeId);
        setWishListRecipes([...wishlistRecipes, { recipeId }]);
      }
      
      alert(`Recipe ${isRecipeInWishlist ? 'removed from' : 'added to'} wishlist successfully`);
    } catch (error) {
      alert('Error updating wishlist');
    }
  };

  const handleShare = (recipeId) => {
    console.log('Recipe ID:', recipeId);
    alert(`Sharing recipe ID: ${recipeId}`);
  };

  const isInWishlist = (recipeId) => {
    return wishlistRecipes.some(item => item.recipeId === recipeId);
  };

  return (
    <div>
      <Dash />
      <div style={{ marginTop: '80px', padding: '10px' }}>
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.recipeId}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {recipe.recipeName.charAt(0)}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={recipe.recipeName}
                  subheader={`Cuisine: ${recipe.cuisine}`}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={`/static/images/cards/${recipe.image}`}
                  alt={recipe.recipeName}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {recipe.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => handleWishlist(recipe.recipeId)}
                  >
                    <FavoriteIcon sx={{ color: isInWishlist(recipe.recipeId) ? red[500] : 'inherit' }} />
                  </IconButton>
                  <IconButton
                    aria-label="share"
                    onClick={() => handleShare(recipe.recipeId)}
                  >
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expandedCards[recipe.recipeId]}
                    onClick={() => handleExpandClick(recipe.recipeId)}
                    aria-expanded={expandedCards[recipe.recipeId]}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expandedCards[recipe.recipeId]} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Ingredients:</Typography>
                    <Typography paragraph>{recipe.ingredient}</Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Dial />
    </div>
  );
};

export default Home;
