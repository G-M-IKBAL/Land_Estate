import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../Themes";
import React from "react";


import Header from "../components/Header";


const Dashboard = () =>{

    return (

      <Box mb="20px" sx={{ pt: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header  title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>
        </Box>

    );
    
}

export default Dashboard
