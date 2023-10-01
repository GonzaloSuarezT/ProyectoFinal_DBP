import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, ButtonGroup } from "@mui/material";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from "./Login"
import { useUser } from './UserContext';

const theme = createTheme();

const App_teacher = () => {
  //const [sessionName, setSessionName] = useState(null);
  return (
    <ThemeProvider theme={theme}>
    <Menu_teacher/>
    </ThemeProvider>
  );
};

const Menu_teacher = ({ sessionName }) => {
  const { user } = useUser();
  const [data, setData] = useState({
    ensenanza_id: "",
    estudiante_username: "",
    clase_aprobada:"",
    url:"",
    fecha: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const [loadingData, setLoadingData] = useState(true);
  const [serverData, setServerData] = useState([]);
  const [rows, setRows] = useState([]);

  const [selectionModel, setSelectionModel] = useState([]);

  const handleRowSelection = (params) => {
    console.log("Selected Row IDs:", params.selectionModel);
    setSelectionModel(params.selectionModel);
  };

  const columns = [
    { field: "ensenanza_id", headerName: "ID", width: 100 },
    { field: "estudiante_username", headerName: "Student", width: 120 },
    { field: "clase_aprobada", headerName: "Check", width: 120 },
    { field: "url", headerName: "URL", width: 150 },
    { field: "fecha", headerName: "Date", width: 170 },
  ];

  useEffect(() => {
    async function getData() {
      setLoadingData(true);
      await axios
        .get(`http://127.0.0.1:5000/taught/t/${user.username}`)
        .then((response) => {
          setServerData(response.data);
          fillRows();
          setLoadingData(false);
        });
    }
    if (loadingData) {
      getData();
    }
  }, [loadingData]);

  function fillRows() {
    let rowArray = [];
    for (let count = 0; count < serverData.length; count++) {
      let rowData = (serverData[count].toString()).split(",");
      let row = {
        id: count,
        ensenanza_id: rowData[0],
        estudiante_username: rowData[1],
        clase_aprobada: rowData[2],
        url: rowData[3],
        fecha: rowData[4]+rowData[5],
      };
      rowArray.push(row);
    }
    setRows(rowArray);
  }

  return (
    
    <Box
    className="App_teacher"
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <Stack spacing={4} width={700}>
      
      <h1>Menu Teacher</h1>
      <p>Welcome, {user.username}</p>
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
    </Stack>
  </Box>
  
  );
}

export default App_teacher;
