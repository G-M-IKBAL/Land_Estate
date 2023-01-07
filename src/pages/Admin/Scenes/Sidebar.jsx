import React,{ useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../Themes";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import BadgeIcon from '@mui/icons-material/Badge';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CottageIcon from '@mui/icons-material/Cottage';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import HomeWorkIcon from '@mui/icons-material/HomeWork';



const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <div style={{float:"left",backgroundColor:colors.primary[400]}}>
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} style={{ minHeight: '100vh' }} >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                 
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`./favicon.ico`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >

                Mohiuddin
                
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                 Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<CottageIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "5px 0 5px 2px" }}
            >
              Data
            </Typography>
            
            <Item
              title="Team"
              to="/team"
              icon={<Diversity3Icon/>}
              selected={selected}
              setSelected={setSelected}
            />
         

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "5px 0 5px 2px" }}
            >
              Registration
            </Typography>

            <Item
              title="Client"
              to="/client_registration"
              icon={<PersonAddIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Employee "
              to="/employee_registration"
              icon={<BadgeIcon />}
              selected={selected}
              setSelected={setSelected}
            />

              <Item
              title="Property"
              to="/property_booking"
              icon={<ApartmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Project"
              to="/project_registration"
              icon={<HomeWorkIcon />}
              selected={selected}
              setSelected={setSelected}
            />


            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "5px 0 5px 2px" }}
            >
              Appointments
            </Typography>

            <Item
              title="calender"
              to="/calender"
              icon={<PermContactCalendarIcon/>}
              selected={selected}
              setSelected={setSelected}
            />




          </Box>
        </Menu>
      </ProSidebar>
    </Box>

    </div>
  );
};

export default Sidebar;
