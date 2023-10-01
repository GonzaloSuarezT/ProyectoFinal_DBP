import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, ButtonGroup } from "@mui/material";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from "./Login"

const theme = createTheme();

const App = () => {
  const [sessionName, setSessionName] = useState(null);
  return (
    <ThemeProvider theme={theme}>
    <Menu_teacher sessionName={sessionName} />
    </ThemeProvider>
  );
};

const Menu_teacher = ({ sessionName }) => {
  const [data, setData] = useState({
    ensenanza_id: 0,
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
  const columns = [
    { field: "ensenanza_id", headerName: "ID", width: 100 },
    { field: "estudiante_username", headerName: "Student", width: 120 },
    { field: "clase_aprobada", headerName: "Check", width: 120 },
    { field: "url", headerName: "URL", width: 150 },
    { field: "fecha", headerName: "Date", width: 170 },
  ];

  useEffect(() => {
    async function getData() {
      //alert(sessionName);
      setLoadingData(true);
      await axios
        .get(`http://127.0.0.1:5000/taught/t/${sessionName}`)
        .then((response) => {
          //alert(sessionName);
          //console(sessionName);
          setServerData(response.data);
          fillRows();
          setLoadingData(false);
        });
    }
    if (loadingData) {
      getData();
    }
  }, [sessionName, loadingData]);

  function fillRows() {
    let rowArray = [];
    for (let count = 0; count < serverData.length; count++) {
      let rowData = (serverData[count].toString()).split(",");
      let row = {
        ensenanza_id: rowData[0],
        estudiante_username: rowData[1],
        clase_aprobada: rowData[2],
        url: rowData[3],
        fecha: rowData[4],
      };
      rowArray.push(row);
    }
    setRows(rowArray);
  }
  
  return (
    
    <Box
    className="App"
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <Stack spacing={4} width={700}>
      
      <h1>Menu Teacher</h1>
      <>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Date</th>
                <th>URL</th>
                <th>Check</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.ensenanza_id}>
                  <td>{row.estudiante_username}</td>
                  <td>{row.fecha}</td>
                  <td>{row.url}</td>
                  <td>{row.clase_aprobada}</td>
                </tr>
              ))}
            </tbody>
          </table>
        
        {console.log("Server Data:")}
        {console.log(serverData)}
        {console.log("Rows:")}
        {console.log(rows)}
      </>
    </Stack>
  </Box>
  
  );
}

export default App;
