import './App.css'
import React, { useState } from 'react'
import Login from './pages/login'
import Employee from './pages/E_dashboard'
import 'bootstrap/dist/css/bootstrap.min.css'

import { ColorModeContext, useMode } from './pages/Admin/Themes'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { Route, Routes } from 'react-router-dom'
import Topbar from './pages/Admin/Scenes/global/Topbar'
import Dashboard from './pages/Admin/Scenes/dashboard/Dashboard'
import Sidebar from './pages/Admin/Scenes/global/Sidebar'

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
