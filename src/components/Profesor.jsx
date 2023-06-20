import React, { useEffect } from 'react';
import {  Box, Button, Stack, TextField } from "@mui/material";

const Teacher =() =>{
    return(
        <Box 
          className="App"
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
        <h1>Horarios de tu profesor</h1>
        <table></table>
        <TextField
            id="outlined-basic"
            label="URL Google Meets"
            variant="outlined"
          />
    <a href="/cursos" target="_self" rel="noopener noreferrer">
        <Button>Reservar</Button>
    </a>
    </Box>);
};

export default Teacher;