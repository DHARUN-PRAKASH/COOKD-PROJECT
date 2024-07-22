import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
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
import { getWishlist ,updateWishlist} from './axios';
import Dash from './dash'

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
  const [recipes, setRecipes] = useState([]);
  const [expanded, setExpanded] = useState(false);





  useEffect(() => {
    const user = sessionStorage.getItem('logged'); 
    const desiredUsername = JSON.parse(user).username
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:1111/getwishlist/${desiredUsername}`);
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
  
    fetchRecipes();
  }, []);
  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleWishlist = async (recipeId) => {

  };

  const handleShare = (recipeId) => {
    console.log('Recipe ID:', recipeId);
    alert(`Sharing recipe ID: ${recipeId}`);
  };
  

  return (
    <div> 
        <Dash/>
           <div style={{ marginTop: '80px', padding: '10px' }}>
      {recipes.map((recipe) => (
        <Card key={recipe.recipeId} sx={{ maxWidth: 345, marginBottom: '20px' }}>
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
            <IconButton aria-label="add to favorites" onClick={() => handleWishlist(recipe.recipeId)}>
              <FavoriteIcon />
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
              <Typography paragraph>Ingrediant:</Typography>
              <Typography paragraph>{recipe.ingrediant}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </div>
    </div>

  );
};

export default Wishlist;
