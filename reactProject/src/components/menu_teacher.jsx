import React, { useEffect, useState } from 'react';
import { Box, Stack, TextField, Button } from "@mui/material";
import axios from "axios";
import { useUser } from './UserContext';

const Menu_teacher = () => {
  const { user } = useUser();
  const [serverData, setServerData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [classId, setClassId] = useState(""); //Estado para almacenar el ID de la clase
  const [updateStatus, setUpdateStatus] = useState(""); //Estado para mostrar el resultado de la actualización
  const [deleteStatus, setDeleteStatus] = useState(""); // Estado para mostrar el resultado de la eliminación

  useEffect(() => {
    async function getData() {
      setLoadingData(true);
      await axios
        .get(`http://127.0.0.1:5000/taught/t/${user.username}`)
        .then((response) => {
          setServerData(response.data);
          setLoadingData(false);
        });
    }
    if (loadingData) {
      getData();
    }
  }, [loadingData, user.username]);

  const getCheckIcon = (value) => {
    return value ? "✔️" : "❌";
  };

  const handleUpdateClaseAprobada = async () => {
    if (classId) {
      await axios.put(`http://127.0.0.1:5000/taught/id/${classId}`, {
        clase_aprobada: false, 
      });

      const updatedData = serverData.map((rowData) => {
        if (rowData.id === parseInt(classId, 10)) {
          return { ...rowData, clase_aprobada: !rowData.clase_aprobada };
        }
        return rowData;
      });

      setServerData(updatedData);
      setUpdateStatus(`Class with ID ${classId} has been succesfully disabled.`);
    } else {
      setUpdateStatus("Please, enter a valid ID class.");
    }
  };

  const handleDeleteClase = async () => {
    if (classId) {
      await axios.delete(`http://127.0.0.1:5000/taught/id/${classId}`);

      const updatedData = serverData.filter((rowData) => rowData.id !== parseInt(classId, 10));

      setServerData(updatedData);
      setDeleteStatus(`Class with ID ${classId} has been successfully deleted.`);
    } else {
      setDeleteStatus("Please, enter a valid class ID.");
    }
  };

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
        {loadingData ? (
          <p>Loading Please Wait...</p>
        ) : (
          <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Check</th>
                <th>URL</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {serverData.map((rowData, index) => (
                <tr key={index}>
                  <td>{rowData[0]}</td>
                  <td>{rowData[1]}</td>
                  <td>{getCheckIcon(rowData[2])}</td>
                  <td>{rowData[3]}</td>
                  <td>{rowData[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <TextField
              label="Clase ID"
              variant="outlined"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
            />
            <Button variant="contained" onClick={handleUpdateClaseAprobada}>
              Disable class
            </Button>
            <Button variant="contained" onClick={handleDeleteClase}>
              Delete Class
            </Button>
            <p>{updateStatus}</p>
            <p>{deleteStatus}</p>
          </>
        )}
      </Stack>
    </Box>
  );
}

export default Menu_teacher;
