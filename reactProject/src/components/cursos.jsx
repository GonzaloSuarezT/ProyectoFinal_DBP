import React, { useEffect } from 'react';
import { useState } from "react";
import {  Box, Button, Stack, TextField , ButtonGroup} from "@mui/material";

/*
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
*/

const Cursos =() =>{
    const [course, setCourse] = useState("");
    function courseHandler(event) {
        console.log(course);
        setCourse(event.target.value);
    }

    

    return(
        <Box 
          className="App"
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
<Stack spacing={4} width={200}>
        <h1>Menu</h1>
        <h2>Choose subject</h2>
<div>

        <ButtonGroup color="primary" variant="contained" aria-label="outlined primary button group">
                    <Button value={"Maths"} onClick={courseHandler}>Maths</Button>
                    <Button value={"Literature"} onClick={courseHandler}>Literature</Button>
        </ButtonGroup>

        <ButtonGroup color="warning" variant="contained" aria-label="outlined primary button group">
                <Button value={"History"} onClick={courseHandler}>History</Button>
                <Button value={"Chemistry"} onClick={courseHandler}>Chemistry</Button>
        </ButtonGroup>

        <ButtonGroup color="success" variant="contained" aria-label="outlined primary button group">
                <Button value={"Physics"} onClick={courseHandler}>Physics</Button>
                <Button value={"Geography"} onClick={courseHandler}>Geography</Button>
        </ButtonGroup>
        </div>  
        <h3>Available teachers</h3>
        </Stack>
    </Box>
    );
};

export default Cursos;