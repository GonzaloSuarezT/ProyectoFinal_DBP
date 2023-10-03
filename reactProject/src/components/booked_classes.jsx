import React, { useEffect, useState } from 'react';
import { Box, Stack, TextField, Button } from "@mui/material";
import axios from "axios";
import { useUser } from './UserContext';

const BookedClasses = () => {
  const { user } = useUser();
  const [serverData, setServerData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoadingData(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8003/taught/${user.username}`);
        setServerData(response.data);
        setLoadingData(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (loadingData) {
      getData();
    }
  }, [loadingData, user.username]);

  return (
    <Box
      className="BookedClasses"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Stack spacing={4} width={700}>
        <h1>Booked Classes</h1>
        <p>Hello, {user.username}. These are the current statuses of your reservations</p>
        {loadingData ? (
          <p>Loading Please Wait...</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Check</th>
                  <th>URL</th>
                  <th>Date</th>
                  <th>Professor</th>
                </tr>
              </thead>
              <tbody>
                {serverData.map((rowData, index) => (
                  <tr key={index}>
                    <td>{rowData.ensenanza_id}</td>
                    <td>{rowData.ensenanza_clase_aprobada ? "✔️" : "❌"}</td>
                    <td>{rowData.ensenanza_url}</td>
                    <td>{rowData.ensenanza_fecha}</td>
                    <td>{rowData.profesor_username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </Stack>
    </Box>
  );
}

export default BookedClasses;