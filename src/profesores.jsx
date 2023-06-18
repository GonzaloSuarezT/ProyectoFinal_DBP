import React, { useEffect } from 'react';
import {  Box, Button, Stack, TextField , ButtonGroup} from "@mui/material";

const Profesores =() =>{
    return(
        <Box 
          className="App"
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
        <h1>Seleeciona un profesor</h1>

        <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <div>
            <a href="/" target="_self" rel="noopener noreferrer">
                <Button>Profesor1</Button>
            </a>
        </div>
        <div>
            <a href="/" target="_self" rel="noopener noreferrer">
                <Button>Profesor2</Button>
            </a>
        </div>
        </ButtonGroup>

        <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <div>
            <a href="/" target="_self" rel="noopener noreferrer">
                <Button>Profesor3</Button>
            </a>
        </div>
        <div>
            <a href="/" target="_self" rel="noopener noreferrer">
                <Button>Profesor4</Button>
            </a>
        </div>
        </ButtonGroup>

        <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <div>
            <a href="/" target="_self" rel="noopener noreferrer">
                <Button>Profesor5</Button>
            </a>
        </div>
        <div>
            <a href="/" target="_self" rel="noopener noreferrer">
                <Button>Profesor6</Button>
            </a>
        </div>
        </ButtonGroup>

    </Box>);
};

export default Profesores;