import React, { useState } from 'react';
import { Button, TextField, Box, Container, Card, CardContent, Typography, InputAdornment, Link, IconButton, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LocalCafeRoundedIcon from '@mui/icons-material/LocalCafeRounded';
import { callSignup } from './axios';
import { useNavigate, Link as RouterLink } from "react-router-dom";
import textLogo from './Cookd.png';

export default function SignUp() {
  const [user, setUser] = useState({
    username: '',
    password: '',
    fullname: '',
    contact: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from reloading the page
    const res = await callSignup(user);
    alert(JSON.stringify(res.data));
    nav("/");
  };

  const clearFields = () => {
    setUser({
      username: '',
      password: '',
      fullname: '',
      contact: '',
    });
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Box sx={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <Box sx={{
          position: 'absolute',
          top: '60%', 
          left: '57%',
          transform: 'translate(-50%, -50%)',
          zIndex: -1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '165%', 
          height: '180%',
        }}>
          <LocalCafeRoundedIcon sx={{ width: '100%', height: '100%', color: '#ffffff'}} />
        </Box>
        
 
        <Card sx={{ boxShadow: 'none', borderRadius: 2, padding: 2, width: '90%', maxWidth: 400, height: 'auto', borderRadius: '80px', position: 'relative', zIndex: 1 }}>
          <CardContent sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
  
              <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 2 }}>
                <img src={textLogo} alt="Sign In" style={{ width: '90px', height: '90px', borderRadius: '70px' }} />
                <Typography component="h1" variant="h5" sx={{ textAlign: 'left', ml: 2, fontSize: '2rem', color: '#d15e27', fontWeight: 'bold' }}>
                  Sign Up !!
                </Typography>
              </Box>
            </Box>
            <Box component="form" noValidate sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Username"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name"
                    name="fullname"
                    value={user.fullname}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Contact"
                    name="contact"
                    value={user.contact}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneAndroidIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={user.password}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  fullWidth
                  sx={{ marginRight: '10px', backgroundColor: '#d15e27', '&:hover': { backgroundColor: '#b54a1f' } }}
                >
                  Sign Up
                </Button>
                <IconButton
                  onClick={clearFields}
                  sx={{
                    borderRadius: '50%',
                    padding: '10px',
                    color:'white',
                    backgroundColor: '#d15e27',
                    '&:hover': {
                      backgroundColor: '#b54a1f'
                    }
                  }}
                >
                  <BackspaceRoundedIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                Already have an account? <Link component={RouterLink} to="/" variant="body2" sx={{ color: '#d15e27',fontWeight: 'bold' }}>Sign In</Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
