import React, { useEffect } from 'react';
import {  Box, Button, Stack, TextField , ButtonGroup} from "@mui/material";

const Cursos =() =>{
    return(
        <Box 
          className="App"
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >

        <h1>Choose your subject:</h1>

        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <div className='contenedor'>
                <a href="/teachers" target="_self" rel="noopener noreferrer">
                    <Button>Maths</Button>
                </a>
            </div>
            <div>
                <a href="/teachers" target="_self" rel="noopener noreferrer">
                    <Button>Literature</Button>
                </a>
            </div>
        </ButtonGroup>

        <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <div>
            <a href="/teachers" target="_self" rel="noopener noreferrer">
                <Button>History</Button>
            </a>
        </div>
        <div>
            <a href="/teachers" target="_self" rel="noopener noreferrer">
                <Button>Chemistry</Button>
            </a>
        </div>
        </ButtonGroup>

        <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <div>
            <a href="/teachers" target="_self" rel="noopener noreferrer">
                <Button>Physics</Button>
            </a>
        </div>
        <div>
            <a href="/teachers" target="_self" rel="noopener noreferrer">
                <Button>Geography</Button>
            </a>
        </div>
        </ButtonGroup>

    </Box>);
};

export default Cursos;