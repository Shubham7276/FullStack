import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/Login';
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from './Components/Signup/Signup';
import EmailVerify from './Components/EmailVerify/EmailVerify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const user = localStorage.getItem("token");
  return (
    <Routes>
			{/* {user && <Route path="/" exact element={<Main />} />} */}
			{user && <Route path="/signup" element={<Navigate replace to="/" />} />}
			{user && <Route path="/login" element={<Navigate replace to="/" />} />}
			{/* {user && <Route path="/*" element={<Navigate replace to="/" />} />} */}
			<Route path="/signup"  element={<SignUp />} />
			<Route path="/login"  element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/api/auth/:id/verify/:token" element={<EmailVerify />} />
			{/* <Route path="/temp" exact element={<Emailtemp />} /> */}
			{/* <Route path="/home" exact element={<Home />} /> */}


			
		</Routes>
  );
}

export default App;
