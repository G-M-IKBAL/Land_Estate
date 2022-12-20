import './App.css'
import React, { useState } from 'react'
import Login from './pages/login'
import Employee from './pages/E_dashboard'
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

function App() {
  const [theme, colorMode] = useMode()
  const [isSidebar, setIsSidebar] = useState(true)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
       
        <Sidebar isSidebar={isSidebar} />
          <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
         
            <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/client_registration" element={<Client_registration />} />
            <Route path="/employee_registration" element={<Employee_registration />} />
            <Route path="/investore_registration" element={<Investore_registration/>} /> 
           <Route path="/property_booking" element={<Property_Booking />} />
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
