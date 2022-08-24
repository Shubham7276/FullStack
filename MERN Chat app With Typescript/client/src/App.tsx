import {BrowserRouter,Routes, Route, Navigate } from "react-router-dom";
import Login from './Components/Login/Login';
import SignUp from './Components/Signup/Signup';
import EmailVerify from './Components/EmailVerify/EmailVerify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Main/Home';



function App() {
  const user = localStorage.getItem("token");

  return (
	  
	<BrowserRouter>
    <Routes>
			{user && <Route path="/" element={<Home />} />}
			{user && <Route path="/signup" element={<Navigate replace to="/" />} />}
			{user && <Route path="/login" element={<Navigate replace to="/" />} />}
			{user && <Route path="/*" element={<Navigate replace to="/" />} />}
			<Route path="/signup"  element={<SignUp />} />
			<Route path="/login"  element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/api/auth/:id/verify/:token" element={<EmailVerify />} />
		</Routes>
		</BrowserRouter>
  );
}

export default App;
