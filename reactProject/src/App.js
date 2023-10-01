//import logo from './logo.svg';
import './App.css';

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import RegisterStudent from "./components/RegStudent"
import RegisterTeacher from "./components/RegTeacher"
import Cursos from "./components/cursos"
import Menu_teacher from "./components/menu_teacher"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registerstudent" element={<RegisterStudent/>}></Route>
        <Route path="/registerteacher" element={<RegisterTeacher/>}></Route>
        <Route path="/cursos" element={<Cursos/>}></Route>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/menu_teacher" element={<Menu_teacher/>}></Route>
      </Routes>
    </Router>

   
  );
}

//Terminal: npm start --prefix reactProject/

export default App;
