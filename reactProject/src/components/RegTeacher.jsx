import React, { useEffect } from 'react';
import {  Box, Button, Stack, TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const signatures = [
  {
    value: 'Maths',
    label: 'Maths',
  },
  {
    value: 'Literature',
    label: 'Literature',
  },
  {
    value: 'History',
    label: 'History',
  },
  {
    value: 'Chemistry',
    label: 'Chemistry',
  },
  {
    value: 'Physics',
    label: 'Physics',
  },
  {
    value: 'Geography',
    label: 'Geography',
  }
];

const RegisterTeacher = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    email:"",
    experiencia:0,
    curso:""
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
        email: data.email,
        experiencia: data.experiencia,
        curso: data.curso
      };
      axios.post("http://127.0.0.1:8002/teachers", userData).then((response) => {
        console.log(response.status, response.data.token);
      });
      navigate('/');
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
          <h1>Teacher</h1>
          <p>Ready to teach?</p>
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
            name='email'
            label="Email"
            variant="outlined"
            type={"email"}
            value={data.email}
            onChange={handleChange}
          />
          <h3>Password:</h3>
          <TextField
            id="outlined-basic3"
            name='password'
            label="Password"
            variant="outlined"
            type={"password"}
            value={data.password}
            onChange={handleChange}
          />
          <h3>Course:</h3>
          <TextField
          id="outlined-select-curso"
          select
          label="Select curso"
          name='curso'
          helperText="Please select"
          value={data.curso}
          onChange={handleChange}
        >
          {signatures.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
          <h3>Experience years:</h3>
          <TextField
            id="outlined-basic4"
            name='experiencia'
            label="Number"
            type='number'
            variant="outlined"
            value={data.experiencia}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained">Register</Button>
          </form>
        </Stack>
      </Box>
    );
};

export default RegisterTeacher;