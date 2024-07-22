// CustomSpeedDial.js
import React, { useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import { styled } from '@mui/material/styles';
import RecipeDialog from './RecipeDialog'; 
const CustomSpeedDialIcon = styled(SpeedDialIcon)(({ theme }) => ({
  backgroundColor: '#d15e27',
  color: '#fff',
  borderRadius: '50%',
  padding: '17px',
}));

const Dial = ({ onFilter }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 25 }}
        icon={<CustomSpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<AddCircleRoundedIcon sx={{ color: '#d15e27' }} />}
          tooltipTitle="Add Recipe"
          onClick={handleOpenDialog}
        />
        <SpeedDialAction
          icon={<FilterAltRoundedIcon sx={{ color: '#d15e27' }} />}
          tooltipTitle="Filter"
          onClick={onFilter}
        />
      </SpeedDial>
      <RecipeDialog open={dialogOpen} handleClose={handleCloseDialog} />
    </>
  );
};

export default Dial;
