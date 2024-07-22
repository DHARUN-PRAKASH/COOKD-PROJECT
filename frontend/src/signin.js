import { useState } from "react";
import { callcred } from "./axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Container, Card, CardContent, Typography } from "@mui/material";

export const SignIn = () => {
  const [users, setUsers] = useState({
    username: "",
    password: ""
  });

  const nav = useNavigate();

  const collect = (eve) => {
    const { name, value } = eve.target;
    setUsers((old) => ({
      ...old,
      [name]: value
    }));
  };

  const sub = async () => {
    const res = await callcred(users);
    alert(JSON.stringify(res));
    if (res.data) {
       sessionStorage.setItem("logged", JSON.stringify(users));
      nav("/home");
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
      <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ mb: 3, textAlign: 'center', color: '#333' }}>
            Sign In
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Username"
              name="username"
              onChange={collect}
              value={users.username}
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              onChange={collect}
              value={users.password}
              variant="outlined"
              fullWidth
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={sub}
                sx={{ minWidth: '100px' }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={clearFields}
                sx={{ minWidth: '100px' }}
              >
                Clear
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
