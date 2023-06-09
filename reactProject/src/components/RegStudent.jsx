import React, { useEffect } from 'react';
import {  Box, Button, ButtonGroup ,Stack, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const RegisterStudent = () => {

const [data, setData] = useState({
  username: "",
  password: "",
  email:""
});

const handleChange = (e) => {
  const value = e.target.value;
  setData({
    ...data,
    [e.target.name]: value
  });
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: data.username,
      password: data.password,
      email: data.email
    };
    axios.post("http://127.0.0.1:5000/students", userData).then((response) => {
      console.log(response.status, response.data.token);
    });
    window.location.href = "/cursos";
  };
    
    /*
    async function hacerConsultaHTTP(params) {
        await fetch("www.google.com");
    }
    return () => {
        hacerConsultaHTTP()
    };
*/

/*
  function usernameHandler(event) {
    setUsername(event.target.value);
  }

  function emailHandler(event) {
    setEmail(event.target.value);
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  */
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
          <form onSubmit={handleSubmit}>
          <h3>Username:</h3>
          <TextField
            id="outlined-basic"
            name='username'
            label="User"
            variant="outlined"
            value={data.username}
            onChange={handleChange}
          />
          <h3>Email:</h3>
          <TextField
            id="outlined-basic2"
            label="Email"
            name='email'
            variant="outlined"
            type={"email"}
            value={data.email}
            onChange={handleChange}
          />
          <h3>Password:</h3>
          <TextField
            id="outlined-basic3"
            label="Password"
            name='password'
            variant="outlined"
            type={"password"}
            value={data.password}
            onChange={handleChange}
          />
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