import React, { useEffect, useState } from 'react';
import {  Box, Button, Stack, TextField , ButtonGroup} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from "axios";

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Cursos />
    </ThemeProvider>
  );
};

const Cursos =() =>{
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [serverData, setServerData] = useState([]);
  const [rows, setRows] = useState([]);
  
  const [data, setData] = useState({
    fecha: "",
    url: "",
    check:false,
    studentName:"",
    teacherName:"",
    teacherCourse:""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const [selectionModel, setSelectionModel] = useState([]);

  //const handleSelectionModelChange = (newSelectionModel) => {
  //  setSelectionModel(newSelectionModel);
  //};

  const handleRowSelection = (params) => {
    setSelectionModel(params.selectionModel);
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }

    const selectedRowId = selectionModel[0]; // Suponemos que solo se permite seleccionar una fila

    if (selectedRowId !== undefined && selectedRowId !== null) {
      const selectedRow = rows.find((row) => row.id === selectedRowId);

      const userData = {
        fecha: data.fecha,
        url: data.url,
        studentName: data.studentName,
        check: true,
        teacherName: selectedRow.username,
        teacherCourse: selectedRow.course,
      };

      axios.post("http://127.0.0.1:5000/taught", userData).then((response) => {
        console.log(response.status, response.data.token);
      });
      alert("Registered!");
    } else {
      console.log(selectedRowId)
      alert("Please select a teacher.");
    }
  };

    function courseHandler(event) {
      const selectedCourse = event.target.value;
      setSelectedCourse(selectedCourse);
    }


  const columns = [
    { field: "username", headerName: "Teacher", width: 120 },
    { field: "email", headerName: "Email", width: 170 },
    { field: "expYears", headerName: "Experience years", width: 150 },
    { field: "course", headerName: "Subject", width: 120 },
  ];
    
  useEffect(() => {
    if (selectedCourse) {
        getData(selectedCourse);
    }
}, [selectedCourse]);

async function getData(course) {
  setLoadingData(true);
  //await axios
  const response = await axios.get(`http://127.0.0.1:5000/teachers/${course}`);
  setServerData(response.data);
  fillRows(response.data);
  setLoadingData(false);
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
        course: serverData[count].course,
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
        <DataGrid
      rows={rows}
      columns={columns}
      checkboxSelection
      selectionModel={selectionModel}
      onSelectionModelChange={handleRowSelection}
    />
      )}
      {console.log("Server Data:")}
      {console.log(serverData)}
      {console.log("Rows:")}
      {console.log(rows)}
    </>
    <form onSubmit={handleSubmit}>
    <h3>Set date</h3>
    <TextField
            id="outlined-basic"
            name='fecha'
            variant="outlined"
            type={"date"}
            value={data.fecha}
            onChange={handleChange}
          />
          <h3>Send link</h3>
        <TextField
            id="outlined-basic1"
            name='url'
            label="URL Google Meets"
            variant="outlined"
            value={data.url}
            onChange={handleChange}
          />
          <h3>Confirm username</h3>
        <TextField
            id="outlined-basic2"
            name='studentName'
            label="username"
            variant="outlined"
            value={data.studentName}
            onChange={handleChange}
          />
        <Button type="submit">Reservar</Button>
        </form>
        </Stack>
    </Box>
    );
};

export default App;