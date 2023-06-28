//import logo from './logo.svg';
import './App.css';

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import RegisterStudent from "./components/RegStudent"
import RegisterTeacher from "./components/RegTeacher"
import Cursos from "./components/cursos"
import Teacher from "./components/Profesor"
import Profesores from "./components/profesores"
import menu_teacher from "./components/menu_teacher"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/registerstudent" element={<RegisterStudent/>}></Route>
        <Route path="/registerteacher" element={<RegisterTeacher/>}></Route>
        <Route path="/cursos" element={<Cursos/>}></Route>
        <Route path="/teacher" element={<Teacher/>}></Route>
        <Route path="/teachers" element={<Profesores/>}></Route>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/menuteacher" element={<menu_teacher/>}></Route>
      </Routes>
    </Router>

   
  );
}

//Terminal: npm start --prefix reactProject/

export default App;
