//import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import RegisterStudent from "./RegStudent"
import RegisterTeacher from "./RegTeacher"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/registerstudent" element={<RegisterStudent/>}></Route>
        <Route path="/registerteacher" element={<RegisterTeacher/>}></Route>
        <Route path="/" element={<Login/>}></Route>
      </Routes>
    </Router>

   
  );
}

export default App;
