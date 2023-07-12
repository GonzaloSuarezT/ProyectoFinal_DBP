import React, { useEffect, useState } from 'react';
import {  Box, Button, Stack, TextField , ButtonGroup} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";

const Cursos =() =>{
  const [selectedCourse, setSelectedCourse] = useState(null);
  
    function courseHandler(event) {
      const selectedCourse = event.target.value;
      setSelectedCourse(selectedCourse);
    }

  const [loadingData, setLoadingData] = useState(true);
  const [serverData, setServerData] = useState([]);
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "username", headerName: "Teacher", width: 120 },
    { field: "email", headerName: "Email", width: 170 },
    { field: "expYears", headerName: "Experience years", width: 150 },
    { field: "check", headerName: "Choose", width: 70 },
  ];
    
  useEffect(() => {
    if (selectedCourse) {
        getData(selectedCourse);
    }
}, [selectedCourse]);

async function getData(course) {
  setLoadingData(true);
  await axios
      .get(`http://127.0.0.1:5000/teachers/${course}`)
      .then((response) => {
        setServerData(response.data);
        fillRows(); // Agregar esta línea para llamar a fillRows() después de establecer los datos del servidor
        setLoadingData(false);
      });
}

  function fillRows() {
    let rowArray = [];
    for (let count = 0; count < serverData.length; count++) {
      let row;
      row = {
        id: count,
        username: serverData[count].username,
        email: serverData[count].email,
        expYears: serverData[count].expYears + " years",
        check: "filler",
      };
      rowArray.push(row);
    }
    setRows(rowArray);
  }

    return(
        <Box 
          className="App"
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
<Stack spacing={4} width={700}>
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
        <>
      {loadingData ? (
        <p>Loading Please Wait...</p>
      ) : (
        <DataGrid rows={rows} columns={columns}/>
      )}
      {console.log("Server Data:")}
      {console.log(serverData)}
      {console.log("Rows:")}
      {console.log(rows)}
    </>
        </Stack>
    </Box>
    );
};

export default Cursos;