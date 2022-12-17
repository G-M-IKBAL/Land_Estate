
import './App.css';
import React from 'react'
import Login from'./pages/login'
import Employee from './pages/E_dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return(
    <>
     
     <Router>

{/* <Routes>
<Route path="/login" element={<Login/>}/>
</Routes> */}

<Routes>
<Route path="/" element={<Employee/>}/>
</Routes>




     </Router>
      

    
    
    </>
  

  ); 

    
}

export default App;
