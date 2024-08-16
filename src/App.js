
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './Views/Home';
import Login from './Views/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import '../node_modules/bootstrap/dist/js/bootstrap.esm.js'
import Signup from './Views/Signup.js';


function App() {
  return (
    <>
  
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home/>}></Route>
            <Route exact path='/login' element={<Login/>}></Route>
            <Route exact path='/createUser' element={<Signup/>}></Route>
          </Routes>
        </div>
      </Router>
       
    </>
    
  );
}

export default App;
