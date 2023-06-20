import React, { useEffect } from 'react';
import {  Box, Button, Stack, TextField } from "@mui/material";
//import { useState } from "react";

const RegisterTeacher = () => {
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
          <h3>Username:</h3>
          <TextField
            id="outlined-basic"
            label="User"
            variant="outlined"
          />
          <h3>Email:</h3>
          <TextField
            id="outlined-basic2"
            label="Email"
            variant="outlined"
            type={"email"}
          />
          <h3>Password:</h3>
          <TextField
            id="outlined-basic2"
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <h3>Course:</h3>
          <TextField
            id="outlined-basic"
            label="Course"
            variant="outlined"
          />
          <h3>Experience years:</h3>
          <TextField
            id="outlined-basic"
            label="Course"
            variant="outlined"
          />
          <h3>Submit profile pic:</h3>
          <Button>Upload...</Button>
          <Button variant="contained">Register</Button>
        </Stack>
      </Box>
    );
};

export default RegisterTeacher;