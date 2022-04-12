import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import Firstcomponant from './componant/Firstcomponant';
import Secondcomponant from './componant/Secondcomponant';
import Thirdcomponant from './componant/Thirdcomponant';
import Myfun from './componant/Myfun';
import Myclass from './componant/Myclass';

function App() {
  return (
    <>
    {/* <Firstcomponant/>
    <Secondcomponant/>
    <Thirdcomponant/> */}
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Myfun/>}></Route>
      <Route path="/Myclass" element={<Myclass/>}></Route>
    </Routes>
    </BrowserRouter>



    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
