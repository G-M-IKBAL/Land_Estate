import { Box, IconButton, useTheme } from "@mui/material";
import React,{ useContext } from "react";
import { ColorModeContext, tokens } from "../Themes";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'

import SearchIcon from "@mui/icons-material/Search";

import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Typography from '@mui/material/Typography';

import { mocNotifications } from "../data/mockData";

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';


const Topbar = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);



  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? colors.primary[500] : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  return (
    

    <div style={{float:"right"}}>


 
    <Box display="flex" justifyContent="space-between" p={2} >
     
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>



       <IconButton>

        <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div >
          <NotificationsOutlinedIcon variant="contained" {...bindTrigger(popupState)}/>
          <Popover
            {...bindPopover(popupState)}

            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',

            }}

            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
              
            }}
          >


            <Typography

             sx={{ p: 10 , marginTop:-8 ,
              
              backgroundColor: theme.palette.mode === 'dark' ? colors.primary[400] : "#fff",
            }}
              
              >


             <Box
             
            //  mt="0px"
            //  marginTop={-2}
             marginBottom={-2}

             p="0 30px"
           
             sx={{borderRadius: '16px', boxShadow:20 , backgroundColor:colors.grey[600]}}
             >
              
              <Typography
                variant="h4"
                fontWeight="bold"
                color={colors.greenAccent[600]}
              >
                Notification's
              </Typography>
             </Box>

{mocNotifications.map((Noti)=>(
  
            <Typography
  
                variant="h1"
               fontWeight="bold"
                color={colors.grey[100]}
                sx={{marginTop:5}}

              >

          <Box sx={{ width: '100%' , boxShadow:20 , borderRadius:'16px' , ml:'-60px'}}>
          <Stack spacing={1} width='170%' height='20%'>
          <Item > <img
                  alt="profile-user"
                  width="45px"
                  height="45px"
                  src={`./favicon.ico`}
                  
                  
                  style={{  borderRadius: "50%" }}
                />{Noti.Notification}</Item>
          </Stack>
          </Box>

            </Typography>   

)
)}
          
              </Typography>

          </Popover>

        </div>
      )}
    </PopupState>
        </IconButton>


                      {/* Logout  */}



        <IconButton>

          <SettingsOutlinedIcon />

        </IconButton>


        <IconButton>
          <PowerSettingsNewIcon/>
        </IconButton>



      </Box>
    </Box>

    </div>
  );
  
};

export default Topbar;
