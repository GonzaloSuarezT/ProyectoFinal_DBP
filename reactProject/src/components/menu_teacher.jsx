import React, { useEffect } from 'react';
import {  Box, Button, Stack, TextField , ButtonGroup} from "@mui/material";

const menu_teacher =()=>{
    return(
        <Box 
          className="App"
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
            <h>Menu Teacher</h>
            <table>
                <tr>
                    <th>Alumno</th>
                    <th>Curso</th>
                    <th>Fecha</th>
                    <th>URL</th>
                    <th>Checkbox</th>

                </tr>
            </table>

        </Box>
    )
}
export default menu_teacher;