//import logo from './logo.svg';
import './App.css';

import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import RegisterStudent from "./components/RegStudent"
import RegisterTeacher from "./components/RegTeacher"
import Cursos from "./components/cursos"
import Menu_teacher from "./components/menu_teacher"
import { useState } from 'react'; // Importa useState

function App() {
  //const navigate = useNavigate(); // Obtiene la función de navegación
  const [sessionName, setSessionName] = useState(null); // Estado para sessionName
  return (
    <Router>
      <Routes>
        <Route path="/registerstudent" element={<RegisterStudent/>}></Route>
        <Route path="/registerteacher" element={<RegisterTeacher/>}></Route>
        <Route path="/cursos" element={<Cursos/>}></Route>
        <Route path="/" element={<Login setSessionName={setSessionName} />} /> {/* Pasa setSessionName como prop */}
        <Route
          path="/menu_teacher"
          element={<Menu_teacher sessionName={sessionName} />} // Pasa sessionName como prop
        />
      </Routes>
    </Router>

   
  );
}

//Terminal: npm start --prefix reactProject/

export default App;
