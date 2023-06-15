//import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import RegisterStudent from "./RegStudent"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/" element={<RegisterStudent/>}></Route>
      </Routes>
    </Router>

   
  );
}

export default App;
