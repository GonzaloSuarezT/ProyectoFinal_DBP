import React, { useEffect } from 'react';
import {  Box, Button, ButtonGroup, Stack, TextField } from "@mui/material";
import { useState } from "react";



const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

  useEffect(() => {
    async function hacerConsultaHTTP(params) {
        await fetch("www.google.com");
    }
    return () => {
        hacerConsultaHTTP()
    };
  }, []); //2do parametro arreglo de dependencias (el que cambie)

  function usernameHandler(event) {
    console.log(event.target.value);
    setUsername(event.target.value);
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };


    return (
        <Box 
          className="App"
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
        <Stack spacing={4} width={200}>
          <h1>Megaprof</h1>
          <h2>Login</h2>
          <h3>User:{username}</h3>
          
          <TextField
            id="outlined-basic"
            label="User"
            variant="outlined"
            onChange={usernameHandler}
          />
          <h3>Password:{password}</h3>
          <TextField
            id="outlined-basic2"
            label="Password"
            variant="outlined"
            onChange={passwordHandler}
            type={"password"}
          />
  
          <Button>login</Button>
          <p>No account yet? Register as:</p>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
  <div>
    <a href="/registerstudent" target="_self" rel="origin">
  <Button>Student</Button>
  </a>
  </div>

  <div>
    <a href="/registerteacher" target="_self" rel="origin">
  <Button>Teacher</Button>
  </a>
  </div>
</ButtonGroup>
        </Stack>
      </Box>
    );
};

export default Login;