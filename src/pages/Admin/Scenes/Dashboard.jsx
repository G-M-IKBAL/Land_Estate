import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../Themes";
import { mockTransactions } from "../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../components/Header";
import LineChart from "../components/LineChart";
import Piechart from "../components/Piechart"
// import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";
import Card from "../components/Cards";
import ProgressCircle from "../components/Progress";
import BarChart from "../components/BarChart";
import React from 'react'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

import mocNoti from '../data/mockData'

const Dashboard = () =>{
   const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    width:300,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: colors.blueAccent[500],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: colors.greenAccent[400]
    },
  }));

    return (
      
<Box m="20px" >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

      </Box>

      

<Box
sx={{
  pt:2
}}
/>

       {/* GRID & CHARTS */}
       <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
       >


         {/* ROW 1 */}
         <Box
          
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{borderRadius: '16px',

          // '&:hover': {
               
          //   },
            boxShadow:20
         }}

         >

          <Card
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          </Box>

          <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{borderRadius: '16px', boxShadow:20}}
         >

          <Card
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          </Box> 

          <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{borderRadius: '16px', boxShadow:20}}
         >

          <Card
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          </Box>

          <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{borderRadius: '16px', boxShadow:20}}
         >

          <Card
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          </Box>

           {/* ROW 2 */}

    {/* Pie Chart */}

    <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          sx={{borderRadius: '16px', boxShadow:20}}
         >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
            </Box>
          </Box>
          <Box height="400px" m="-20px 0 0 0" sx={{marginBottom:5}}>
            <Piechart isDashboard={true} />
          </Box>
        </Box>


  {/* /////////////////////  progress bars  */}

  

  <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        sx={{borderRadius: '16px', boxShadow:20}}

        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[400]}`}
            colors={colors.grey[100]}
            p="15px"
          >

             <Typography
                  color={colors.greenAccent[500]}
                  variant="h4"
                  fontWeight="600"
                >
                  Projects1 Details

                  <Box sx={{pt:1.5}}/>

            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
             Income
             <Box sx={{pt:1}}/>
             <BorderLinearProgress variant="determinate" value={50} />
            </Typography>
            <br></br>

            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
             Expense
             <Box sx={{pt:1}}/>
             <BorderLinearProgress variant="determinate" value={65} />
            </Typography>
            <br></br>

            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
             Cash in hand
             <Box sx={{pt:1}}/>
             <BorderLinearProgress variant="determinate" value={80} />
            </Typography>
            <br></br>

            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
             Income
            
             <BorderLinearProgress variant="determinate" value={50} />
            </Typography>
        </Typography> 
</Box>
</Box>


<Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        sx={{borderRadius: '16px', boxShadow:20}}

        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[400]}`}
            colors={colors.grey[100]}
            p="15px"
          >

             <Typography
                  color={colors.greenAccent[500]}
                  variant="h4"
                  fontWeight="600"
                >
                  Projects1 Details

                  <Box sx={{pt:1.5}}/>

            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
             Income
             <Box sx={{pt:1}}/>
             <BorderLinearProgress variant="determinate" value={50} />
            </Typography>
            <br></br>

            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
             Expense
             <Box sx={{pt:1}}/>
             <BorderLinearProgress variant="determinate" value={65} />
            </Typography>
            <br></br>

            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
             Cash in hand
             <Box sx={{pt:1}}/>
             <BorderLinearProgress variant="determinate" value={80} />
            </Typography>
            <br></br>

            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
             Income
            
             <BorderLinearProgress variant="determinate" value={50} />
            </Typography>
           
        </Typography> 
        
</Box>
</Box>








{/* barChart */}

        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          sx={{borderRadius: '16px', boxShadow:20}}
         >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
          </Box>
          <Box height="400px" m="-20px 0 0 0">
            <BarChart isDashboard={true}/>
          </Box>
        </Box>



        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        sx={{borderRadius: '16px', boxShadow:20}}

        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[400]}`}
            colors={colors.grey[100]}
            p="15px"
          >

             <Typography
                  color={colors.greenAccent[500]}
                  variant="h4"
                  fontWeight="600"
                >
                  Projects1 Details

                  <Box sx={{pt:1.5}}/>

            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
             Income
             <Box sx={{pt:1}}/>
             <BorderLinearProgress variant="determinate" value={50} />
            </Typography>
            <br></br>

            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
             Expense
             <Box sx={{pt:1}}/>
             <BorderLinearProgress variant="determinate" value={65} />
            </Typography>
            <br></br>

            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
             Cash in hand
             <Box sx={{pt:1}}/>
             <BorderLinearProgress variant="determinate" value={80} />
            </Typography>
            <br></br>

            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
             Income
            
             <BorderLinearProgress variant="determinate" value={50} />
            </Typography>
        </Typography> 
</Box>
</Box>


{/* Cmapagn Circle */}


 {/* ROW 3 */}
         <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          sx={{borderRadius: '16px', boxShadow:20}}
         >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra expenditures and costs</Typography>
          </Box>
        </Box> 
 

{/* Line chart */}

<Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          sx={{borderRadius: '16px', boxShadow:20}}
         >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue From All Projects
               </Typography> 
                <Typography
                 variant="h3"
                 fontWeight="bold"
                color={colors.greenAccent[500]}
               >
                 $59,342.32
              </Typography> 
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true}/>
          </Box>
        </Box>    
       

       



    </Box>
</Box>


         );
    
}

export default Dashboard
