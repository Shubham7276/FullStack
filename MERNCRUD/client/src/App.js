import logo from './logo.svg';
import './App.css';
import AddUser from './component/AddUser';
import AllUser from './component/AllUsers';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './component/NavBar';
import CodeForInterview from './component/CodeForInterview';
import EditUser from './component/EditUser';
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={CodeForInterview} />
        <Route exact path="/all" component={AllUser} />
        <Route exact path="/add" component={AddUser} />
        <Route exact path="/edit/:id" component={EditUser} />
        {/* { <Route component={NotFound} /> */}
        
        
        
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;
