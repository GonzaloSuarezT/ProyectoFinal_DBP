import React, { useEffect } from 'react';
import {  Box, Button, ButtonGroup, Stack, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";

var isStudent=true;

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: ""
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
        password: data.password
      };

      axios.get(`http://127.0.0.1:5000/students/get/${userData.username}`)
      .then((response) => {
        //console.log(response.status, response.data.token);
        //window.location.href = "/cursos";
        setData(response.data);
        alert(response.username);
      }).catch((err) => {
        
     })
     
      ;
      

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
          <p>As:</p>
      
          

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
  
          <Button type="submit">login</Button>
          </form>

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