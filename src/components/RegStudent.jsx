import React, { useEffect } from 'react';
import {  Box, Button, ButtonGroup ,Stack, TextField } from "@mui/material";
import { useState } from "react";

const RegisterStudent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch('http://127.0.0.1:5000/students', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ username : username, email:email, password:password}) // body data type must match "Content-Type" header
      })
      .then(response => response.json())
      .then(data => 
        {
          setUsername(data.username);
          setEmail(data.email);
          setPassword(data.password)
        })
    
    /*
    async function hacerConsultaHTTP(params) {
        await fetch("www.google.com");
    }
    return () => {
        hacerConsultaHTTP()
    };
*/
    
  }, [username,email,password]);


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
          <form>
          <h3>Username:</h3>
          <TextField
            id="outlined-basic"
            name='username'
            label="User"
            variant="outlined"
            
            onChange={usernameHandler}
          />
          <h3>Email:</h3>
          <TextField
            id="outlined-basic2"
            label="Email"
            name='email'
            variant="outlined"
            type={"email"}
            onChange={emailHandler}
          />
          <h3>Password:</h3>
          <TextField
            id="outlined-basic3"
            label="Password"
            name='password'
            variant="outlined"
            type={"password"}
            onChange={passwordHandler}
          />
          <h3>Submit profile pic:</h3>
          <Button>Upload...</Button>
          <div>
    <a href="/cursos" target="_self" rel="noopener noreferrer">
          <Button type="submit" variant="contained">Register</Button>
          </a>
          </div>
          </form>
        </Stack>
      </Box>
    );
};

export default RegisterStudent;