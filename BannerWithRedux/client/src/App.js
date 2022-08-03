import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Addbanner from './Component/Home'
import Showbanner from '../src/Component/Showbanner'
// import DataTable from '../src/Component/tp'
function App() {
  return (
    
    
      <Routes>
      <Route path="/" exact element={< Addbanner/>} />
      <Route path="/Show" exact element={< Showbanner/>} />
      <Route path="/Home" element={<Navigate replace to="/" />} />
      <Route path="*" element={<Navigate replace to="/" />} />
      {/* <Route path="/tp" exact element={<DataTable/>} /> */}
      </Routes>
   
  );
}

export default App;
