import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, ButtonGroup } from "@mui/material";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Menu_teacher />
    </ThemeProvider>
  );
};

const Menu_teacher = () => {
  const [data, setData] = useState({
    fecha: "",
    url: "",
    check: false,
    studentName: "",
    teacherName: "insert",
    teacherCourse: ""
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
    { field: "studentName", headerName: "Student", width: 120 },
    { field: "fecha", headerName: "Date", width: 170 },
    { field: "url", headerName: "URL", width: 150 },
    { field: "check", headerName: "Check", width: 120 },
  ];

  useEffect(() => {
    async function getData() {
      setLoadingData(true);
      await axios
        .get(`http://127.0.0.1:5000/taught/t/${data.teacherName}`)
        .then((response) => {
          setServerData(response.data);
          fillRows();
          setLoadingData(false);
        });
    }
    if (loadingData) {
      getData();
    }
  }, [data.teacherName, loadingData]);

  function fillRows() {
    let rowArray = [];
    for (let count = 0; count < serverData.length; count++) {
      let row;
      row = {
        id: count,
        studentName: serverData[count].studentName,
        fecha: serverData[count].fecha,
        url: serverData[count].url,
        check: serverData[count].check,
      };
      rowArray.push(row);
    }
    setRows(rowArray);
  }

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    // Resto del código de handleSubmit...
    const userData = {
        teacherName: data.teacherName,
      };
  };

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
        <form onSubmit={handleSubmit}>
          <h3>Confirm username</h3>
          <TextField
            id="outlined-basic"
            name='teacherName'
            label="User"
            variant="outlined"
            value={data.teacherName}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained">Send</Button>
        </form>

        <>
          {loadingData ? (
            <p>Loading Please Wait...</p>
          ) : (
            <DataGrid rows={rows} columns={columns} />
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

export default App;
