import React, { useEffect } from 'react';
import {  Box, Button, ButtonGroup ,Stack, TextField } from "@mui/material";
import { useState } from "react";

const RegisterStudent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function hacerConsultaHTTP(params) {
        await fetch("www.google.com");
    }
    return () => {
        hacerConsultaHTTP()
    };
  }, []);

  function usernameHandler(event) {
    setUsername(event.target.value);
  }

  function emailHandler(event) {
    setEmail(event.target.value);
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
          <h1>Student</h1>
          <p>Ready to learn?</p>
          <h2>Register</h2>
          <h3>Username:</h3>
          <TextField
            id="outlined-basic"
            label="User"
            variant="outlined"
            onChange={usernameHandler}
          />
          <h3>Email:</h3>
          <TextField
            id="outlined-basic2"
            label="Email"
            variant="outlined"
            type={"email"}
            onChange={emailHandler}
          />
          <h3>Password:</h3>
          <TextField
            id="outlined-basic2"
            label="Password"
            variant="outlined"
            type={"password"}
            onChange={passwordHandler}
          />
          <h3>Submit profile pic:</h3>
          <Button>Upload...</Button>
          <div>
    <a href="/cursos" target="_self" rel="noopener noreferrer">
          <Button variant="contained">Register</Button>
          </a>
          </div>
        </Stack>
      </Box>
    );
};

export default RegisterStudent;