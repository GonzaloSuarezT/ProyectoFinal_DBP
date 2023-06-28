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

        <h1>Seleeciona un curso</h1>

        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <div className='contenedor'>
                <a href="/teachers" target="_self" rel="noopener noreferrer">
                    <Button>Curso1</Button>
                </a>
            </div>
            <div>
                <a href="/teachers" target="_self" rel="noopener noreferrer">
                    <Button>Curso2</Button>
                </a>
            </div>
        </ButtonGroup>

        <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <div>
            <a href="/teachers" target="_self" rel="noopener noreferrer">
                <Button>Curso3</Button>
            </a>
        </div>
        <div>
            <a href="/teachers" target="_self" rel="noopener noreferrer">
                <Button>Curso4</Button>
            </a>
        </div>
        </ButtonGroup>

        <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <div>
            <a href="/teachers" target="_self" rel="noopener noreferrer">
                <Button>Curso5</Button>
            </a>
        </div>
        <div>
            <a href="/teachers" target="_self" rel="noopener noreferrer">
                <Button>Curso6</Button>
            </a>
        </div>
        </ButtonGroup>

    </Box>);
};

export default Cursos;