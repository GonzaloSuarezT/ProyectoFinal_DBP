import React, { useEffect, useState } from 'react';
import { Box, Stack } from "@mui/material";
import axios from "axios";
import { useUser } from './UserContext';

const Menu_teacher = () => {
  const { user } = useUser();
  const [serverData, setServerData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

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
        )}
      </Stack>
    </Box>
  );
}

export default Menu_teacher;
