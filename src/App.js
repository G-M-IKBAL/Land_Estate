import './App.css'
import React, { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import { ColorModeContext, useMode } from './pages/Admin/Themes'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { Route, Routes } from 'react-router-dom'
import Topbar from './pages/Admin/Scenes/Topbar'
import Dashboard from './pages/Admin/Scenes/Dashboard'
import Sidebar from './pages/Admin/Scenes/Sidebar'
import Team from './pages/Admin/Scenes/team'
import Client_registration from './pages/Admin/Scenes/Registrations/clientRgistration'
import Employee_registration from './pages/Admin/Scenes/Registrations/Employee_registration'
import Investore_registration from './pages/Admin/Scenes/Registrations/Investore_registration'
import Property_Booking from './pages/Admin/Scenes/Registrations/Property_Booking'
import Project_Rgistration from './pages/Admin/Scenes/Registrations/Project.jsx'

import Calender from './pages/Admin/Scenes/calender.jsx'
import Chart from './pages/Admin/Scenes/BarChart'
import Pie from './pages/Admin/Scenes/PieChart'
import Line from './pages/Admin/Scenes/LineChart'

import Login from './pages/Sign-In/login'

// Employee calls here

import Employee_Topbar from './pages/Employee/Topbar'
import Employee_Sidebar from './pages/Employee/Sidebar'
import EmployeeCR from './pages/Employee/Registrations/clientRgistration'
import EmployeePB from './pages/Employee/Registrations/Property_Booking'
import Expenses from './pages/Employee/Registrations/Expenses'
import Instalments from './pages/Employee/Registrations/instalments'





function App() {
  const [theme, colorMode] = useMode()
  const [isSidebar, setIsSidebar] = useState(true)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">

        {/* <Sidebar isSidebar={isSidebar} /> */}

        <Employee_Sidebar isSidebar={isSidebar} />

          <main className="content">

          {/* <Topbar setIsSidebar={setIsSidebar} /> */}

          <Employee_Topbar isSidebar={isSidebar} />

         
            {/* <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={ <Login/> }/> 
            <Route path="/team" element={<Team />} />
            <Route path="/client_registration" element={<Client_registration />} />
            <Route path="/employee_registration" element={<Employee_registration />} />
            <Route path="/investore_registration" element={<Investore_registration/>} /> 
           <Route path="/property_booking" element={<Property_Booking />} />
           <Route path="/project_registration" element={<Project_Rgistration />} />

           <Route path="/calender" element={<Calender/>} />
           <Route path="/piechart" element={ <Pie/> }/>
           <Route path="/linechart" element={ <Line/> }/>
           <Route path="/barchart" element={ <Chart/> }/>
            </Routes> */}



            <Routes>
            <Route path="/employeeCR" element={ <EmployeeCR/> }/>
            <Route path="/employeePB" element={ <EmployeePB/> }/>
            <Route path="/expense" element={ <Expenses/> }/>   
            <Route path="/instalments" element={ <Instalments/> }/>     
            </Routes> 


          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

    //   <Router>

    // {/* <Routes>
    // <Route path="/login" element={<Login/>}/>
    // </Routes> */}

    // <Routes>
    // <Route path="/" element={<Employee/>}/>
    // </Routes>
    //      </Router>
  )
}

export default App
