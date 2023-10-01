import React, { useEffect, useState } from 'react';
import {  Box, Button, Stack, TextField , ButtonGroup} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from "axios";
import { useUser } from './UserContext';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Cursos />
    </ThemeProvider>
  );
};

const Cursos =({ sessionName }) =>{
  const { user } = useUser();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [serverData, setServerData] = useState([]);
  const [rows, setRows] = useState([]);
  
  const [data, setData] = useState({
    fecha: "",
    clase_aprobada: "",
    check:false,
    estudiante_username:"",
    profesor_username:"",
    curso:""
  });

  const handleCourseSelection = (course) => {
    setSelectedCourse(course);
    getData(course); //Llama a la función para cargar los datos del servidor
  };
  
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const [selectionModel, setSelectionModel] = useState([]);

  const handleRowSelection = (params) => {
    console.log("Selected Row IDs:", params.selectionModel);
    setSelectionModel(params.selectionModel);
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }

    //const selectedRowId = selectionModel[0]; //Suponemos que solo se permite seleccionar una fila

    
      //const selectedRow = rows.find((row) => row.id === selectedRowId);

      const userData = {
        fecha: data.fecha,
        url:data.url,
        clase_aprobada: true,
        estudiante_username: user.username,
        profesor_username: data.profesor_username,
        teacherCourse: selectedCourse,
      };

      axios.post("http://127.0.0.1:5000/taught", userData).then((response) => {
        console.log(response.status, response.data.token);
      });
      alert("Registered!");
    
  };

  const columns = [
    { field: "username", headerName: "Teacher", width: 120 },
    { field: "email", headerName: "Email", width: 170 },
    { field: "experiencia", headerName: "Experience years", width: 150 },
    { field: "curso", headerName: "Subject", width: 120 },
  ];
    
  useEffect(() => {
    if (selectedCourse) {
        getData(selectedCourse);
    }
}, [selectedCourse]);

async function getData(course) {
  setLoadingData(true);
  const response = await axios.get(`http://127.0.0.1:5000/teachers/${course}`);
  setServerData(response.data);
  fillRows(response.data);
  setLoadingData(false);
}


function fillRows() {
  let rowArray = [];
  for (let count = 0; count < serverData.length; count++) {
    let rowData = (serverData[count].toString()).split(",");
    let row = {
      id: count,
      username: rowData[1],
      email: rowData[2],
      experiencia: rowData[3] + " years",
      curso: rowData[4],
    };
    rowArray.push(row);
  }
  setRows(rowArray);
  console.log("Updated Rows:", rowArray);
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
        <p>Welcome, {user.username}</p>
        <h2>Choose subject</h2>
<div>

        <ButtonGroup color="primary" variant="contained" aria-label="outlined primary button group">
                    <Button value={"Maths"} onClick={() => handleCourseSelection("Maths")}>Maths</Button>
                    <Button value={"Literature"} onClick={() => handleCourseSelection("Literature")}>Literature</Button>
        </ButtonGroup>

        <ButtonGroup color="warning" variant="contained" aria-label="outlined primary button group">
                <Button value={"History"} onClick={() => handleCourseSelection("History")}>History</Button>
                <Button value={"Chemistry"} onClick={() => handleCourseSelection("Chemistry")}>Chemistry</Button>
        </ButtonGroup>

        <ButtonGroup color="success" variant="contained" aria-label="outlined primary button group">
                <Button value={"Physics"} onClick={() => handleCourseSelection("Physics")}>Physics</Button>
                <Button value={"Geography"} onClick={() => handleCourseSelection("Geography")}>Geography</Button>
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
    <h3>Teacher username</h3>
    <TextField
            id="outlined-basic1"
            name='profesor_username'
            label="Teacher username"
            variant="outlined"
            value={data.profesor_username}
            onChange={handleChange}
          />
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
        <Button type="submit">Reservar</Button>
        </form>
        </Stack>
    </Box>
    );
};

export default App;