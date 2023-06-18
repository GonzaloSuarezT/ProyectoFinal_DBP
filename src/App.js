//import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import RegisterStudent from "./RegStudent"
import RegisterTeacher from "./RegTeacher"
import Cursos from "./cursos"
import Teacher from "./Profesor"
import Profesores from "./profesores"

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
      </Routes>
    </Router>

   
  );
}

export default App;
