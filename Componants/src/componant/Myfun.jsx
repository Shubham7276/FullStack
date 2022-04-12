import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
function Myfun(){
    return (
        <>
        <h1>My First Function</h1>
        <Link to="/Myclass">Class</Link>
        </>
    )

}


// ReactDOM.render(<Myfun />, document.getElementById('root'));

export default Myfun;