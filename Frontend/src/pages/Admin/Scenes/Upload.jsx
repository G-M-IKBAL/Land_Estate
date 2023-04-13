import React, { useState, useEffect } from "react"

import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../Themes";
import { mockDataTeam } from "../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../components/Header";
import { GridToolbar } from "@mui/x-data-grid";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Modal from '@mui/material/Modal';
import { Button, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';





const Upload = () => {


  const navigate = useNavigate();
  const userID = sessionStorage.getItem("userID")
  if (userID === '' || userID === null) {
    navigate('/login')
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [reportData, setReportData] = useState([])
  const [projectData, setProjectData] = useState([])
  const [flag, setFlag] = useState(0)

  const [town, setTown] = useState('')


  // For Modal to display - Adding response to notification
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const dataFetch = async () => {
      const res = await fetch('http://localhost:8080/admin/getProjects', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        })
      });
      const dataF = await res;
      dataF.json().then((result) => {
        // console.log(result)
        setProjectData(result)
        // console.log(projectData);
      })
        .catch((err) => {
          console.log(err)
        })

    };

    dataFetch();

  }, []);

  const handleOpenTab = () => {
    window.open("model?id=" + town, '_blank', 'noopener,noreferrer');
  }



  if (flag === 0)
    return (
      <Modal


        open={open}
        onClose={handleClose}
      // open={open}
      // onClose={handleClose}
      >



        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >

          <Box

            // gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            // alignItems="center"
            justifyContent="center"


            position='absolute'
            top='25%'
            left='45%'
            // transform='translate(-50%, -50%)'


            sx={{

              width: 400,
              height: 300,
              borderRadius: '16px',
              boxShadow: 20

            }}
          >

            <Typography
              variant="h4"
              color={colors.greenAccent[500]}
              fontWeight="bold"
              sx={{ mt: "20px", ml: "50px", justifyContent: "center", alignItems: "center" }}
            >

              Select Town



              <TextField

                fullWidth
                variant="filled"
                labelId="town-label"
                type="text"
                label="Town"
                sx={{ gridColumn: "span 3", width: "8cm", mt: "15%", ml: "9%" }}

                onChange={(event) => { setTown(event.target.value) }}
                select

              >
                {projectData.map(item => (
                  <MenuItem value={item._id}>{item.name}</MenuItem>
                ))}

              </TextField>

            </Typography>

            <Box display="flex" mt="70px" alignItems="center" >
              <Button type="submit" color="secondary" variant="contained" sx={{ width: "3cm", ml: "-150%" }}
              onClick={handleOpenTab}
              >

                <SendIcon sx={{ color: colors.primary[500], fontSize: "26px" }} />

              </Button>

            </Box>


          </Box>
        </Box>


      </Modal>
    )



}

export default Upload