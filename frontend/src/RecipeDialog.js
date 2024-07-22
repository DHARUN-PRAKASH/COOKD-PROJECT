import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { postRecipe } from './axios'; // Adjust the import path as necessary
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';

const cuisines = ['Italian', 'Chinese', 'Indian', 'Mexican', 'American', 'French', 'Thai', 'Japanese'];
const types = ['Starter', 'Main Course', 'Dessert', 'Soup', 'Salad', 'Beverage'];

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 15, // Add border radius to the dialog box
  },
}));

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: '#d15e27',
  color: '#fff',
  textAlign: 'center', 
}));

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#d15e27',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#b84c21',
  },
}));

const ClearButton = styled(Button)(({ theme }) => ({
    backgroundColor:'#d32f2f',
  color: '#fff', 
  '&:hover': {
    backgroundColor: '#ffebee',
  },
}));

const RecipeDialog = ({ open, handleClose }) => {
  const [recipeName, setRecipeName] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [duration, setDuration] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = async () => {
    const formattedDuration = `${duration} minutes`;
    const newRecipe = {
      recipeName,
      cuisine,
      ingredient,
      duration: formattedDuration,
      type,
    };

    try {
      const result = await postRecipe(newRecipe);
      alert(result.message);
      handleClose();
    } catch (error) {
      alert('Error adding recipe');
    }
  };

  const handleClear = () => {
    setRecipeName('');
    setCuisine('');
    setIngredient('');
    setDuration('');
    setType('');
  };

  return (
    <CustomDialog open={open} onClose={handleClose}>
      <CustomDialogTitle>
        <Typography variant="h6"><b>Add New Recipe</b></Typography>
      </CustomDialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Recipe Name"
          fullWidth
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Cuisine</InputLabel>
          <Select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            label="Cuisine"
          >
            {cuisines.map((cuisine) => (
              <MenuItem key={cuisine} value={cuisine}>
                {cuisine}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="Ingredient"
          fullWidth
          multiline
          rows={4}
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Duration (in minutes)"
          fullWidth
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Type"
          >
            {types.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ClearButton onClick={handleClear} startIcon={<BackspaceRoundedIcon />} fullWidth>
              <b>CLEAR</b>
            </ClearButton>
          </Grid>
          <Grid item xs={6}>
            <CustomButton onClick={handleSubmit} endIcon={<SendRoundedIcon />} fullWidth>
              <b>Add Recipe</b>
            </CustomButton>
          </Grid>
        </Grid>
      </DialogActions>
    </CustomDialog>
  );
};

export default RecipeDialog;
