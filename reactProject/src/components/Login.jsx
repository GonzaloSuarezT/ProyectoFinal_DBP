import React, { useEffect } from 'react';
import {  Box, Button, ButtonGroup, Stack, TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const options = [
  {
    value: true,
    label: 'Student',
  },
  {
    value: false,
    label: 'Teacher',
  }
];

const Login = () => {
  const navigate = useNavigate();
  const [sessionName, setSessionName] = useState(null);
  const [flag, setFlag] = useState(true);
  
  function flagHandler(event) {
    setFlag(event.target.value);
  }
  
  const [data, setData] = useState({
    username: "",
    password: "",
    email:""
  });
  
  function handleSessionNameChange(username){
    // Llama a la función proporcionada por el componente principal para actualizar sessionName
    // Por ejemplo, si la función se llama setSessionName, puedes hacerlo de esta manera:
    setSessionName(username);
  };

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


      const getStudentData = () => {
        axios
            .get(`http://127.0.0.1:5000/students/get/${userData.username}`)
            .then(data => 
              {
                var buff = (data.data).toString()
                var dataArray = buff.split(",");
                var lastElement = dataArray[dataArray.length - 1];
                if ( lastElement === userData.password){
                  handleSessionNameChange(userData.username);
                  //window.location.href = "/cursos";
                  navigate('/cursos');
                }
                else{
                  alert("Invalid password");
                }
              }
              )
            .catch(error => {
              console.log(error);
              alert("User not found");
            });
    };

    const getTeacherData = () => {
      axios
          .get(`http://127.0.0.1:5000/teachers/get/${userData.username}`)
          .then(data => 
            {
              var buff = (data.data).toString()
              var dataArray = buff.split(",");
              var lastElement = dataArray[dataArray.length - 1];
              if ( lastElement === userData.password){
                handleSessionNameChange(userData.username);
                //window.location.href = "/menu_teacher";
                navigate('/menu_teacher');
              }
              else{
                alert("Invalid password");
              }
            }
            )
          .catch(error => {
            console.log(error);
            alert("User not found");
          });
  };

    if(flag){
      getStudentData();
    }
    else{
      getTeacherData();
    }

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
          
          <TextField
          id="outlined-select-option"
          select
          label="Select"
          name='options'
          helperText="Student/Teacher"
          value={flag}
          onChange={flagHandler}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

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