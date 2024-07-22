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
import Dash from './dash';

// Import the removeWishlist function
import { removeWishlist } from './axios';

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

const Wishlist = () => {
  const [expanded, setExpanded] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [wishlistRecipes, setWishlistRecipes] = useState([]);

  useEffect(() => {
    const user = sessionStorage.getItem('logged'); 
    const desiredUsername = JSON.parse(user).username;
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`http://localhost:1111/getwishlist/${desiredUsername}`);
        setRecipes(response.data);
        setWishlistRecipes(response.data); // Assuming this is the wishlist recipes
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchWishlist();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleWishlist = async (recipeId) => {
    const user = sessionStorage.getItem('logged'); 
    const username = JSON.parse(user).username;

    // If the recipe is already in the wishlist, remove it
    if (isInWishlist(recipeId)) {
      try {
        await removeWishlist(username, recipeId);
        // Remove the recipe from local state
        setWishlistRecipes((prev) => prev.filter(item => item.recipeId !== recipeId));
      } catch (error) {
        console.error('Error removing recipe from wishlist:', error);
      }
    } else {
      // Handle adding to wishlist logic if needed
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
            <Grid item xs={12} sm={6} md={3} key={recipe.recipeId}>
              <Card sx={{ maxWidth: 345, marginBottom: '20px' }}>
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
                  <IconButton aria-label="share" onClick={() => handleShare(recipe.recipeId)}>
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
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
    </div>
  );
};

export default Wishlist;
