import { useState } from "react";
import { callcred } from "./axios";
import { TextField, Button, Box, Container, Card, CardContent, Typography, InputAdornment, Link, IconButton } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import LocalDiningRoundedIcon from '@mui/icons-material/LocalDiningRounded';
import WaterDamageRoundedIcon from '@mui/icons-material/WaterDamageRounded';
import textLogo from './Cookd.png';
import { Link as RouterLink } from 'react-router-dom';
import './bg.css';

export const SignIn = () => {
  const [users, setUsers] = useState({
    username: "",
    password: ""
  });

  const collect = (eve) => {
    const { name, value } = eve.target;
    setUsers((old) => ({
      ...old,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const res = await callcred(users);
    alert(JSON.stringify(res));
    if (res.data) {
      sessionStorage.setItem("logged", JSON.stringify(users));
      window.location.assign("/")
    }
  };

  const clearFields = () => {
    setUsers({
      username: "",
      password: ""
    });
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Box sx={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ 
          position: 'absolute', 
          inset: 0, 
          zIndex: -1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          transform: 'translateY(-10%)' 
        }}>
          <WaterDamageRoundedIcon sx={{ width: '200%', height: '200%', color: '#ffffff' }} />
        </Box>
        <Box sx={{ 
          position: 'absolute', 
          inset: 0, 
          zIndex: -1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          transform: 'translateY(-10%)' 
        }}>
          <LocalDiningRoundedIcon sx={{ width: '200%', height: '300%', color: '#ffffff' }} />
        </Box>
        <Card
          sx={{
            boxShadow: 'none',
            borderRadius: 2,
            padding: 2,
            width: '90%',
            maxWidth: 400,
            height: '350px',
            borderRadius: '50px'
          }}
        >
          <CardContent sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 2 }}>
              <img src={textLogo} alt="Sign In" style={{ width: '90px', height: '90px', borderRadius: '70px' }} />
              <Typography component="h1" variant="h5" sx={{ textAlign: 'left', ml: 2, fontSize: '2rem', color: '#d15e27', fontWeight: 'bold' }}>
                Sign in !!
              </Typography>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                marginTop: '15px'
              }}
            >
              <TextField
                label="Username"
                name="username"
                onChange={collect}
                value={users.username}
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 1 }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                onChange={collect}
                value={users.password}
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  fullWidth
                  sx={{ marginRight: '10px',
                    backgroundColor: '#d15e27',
                    '&:hover': {
                      backgroundColor: '#b54a1f'
                    }
                  }}
                >
                  Sign In
                </Button>
                <IconButton
                  onClick={clearFields}
                  sx={{
                    borderRadius: '50%',
                    padding: '10px',
                    color: 'white',
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
                Don't have an account?{' '}
                <Link component={RouterLink} to="/signup" sx={{ color: '#d15e27', fontWeight: 'bold' }}>
                  Sign up
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
