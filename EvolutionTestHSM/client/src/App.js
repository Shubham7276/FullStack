import logo from './logo.svg';
import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Login from './Components/Login';
import Home from './Components/Home';
import Patient from './Components/Patient';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const user = localStorage.getItem("Docid")
  return (
   
    
    <Routes>
      {!user && <Route path="/home" exact  element={<Navigate replace to="/" />} />}
      {user && <Route path="/*" exact  element={<Navigate replace to="/home" />} />}
      {user && <Route path="/home" exact  element={<Home />} />}
      <Route path='/' element={<Login/>}/>
      <Route path='/patient' element={<Patient/>}/>
    </Routes>

    
  );
}

export default App;
