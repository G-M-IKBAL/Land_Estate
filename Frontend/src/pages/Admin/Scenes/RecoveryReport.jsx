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
import Modal from '@mui/material/Modal';
import { Button, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';


import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

function convertIsoToDate(isoDate) {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');
  const millisec = String(date.getMilliseconds()).padStart(3, '0');
  return `${month} / ${day} / ${year}`;
}


const RecoveryReport = () => {

    const navigate = useNavigate();
    const userID = sessionStorage.getItem("userID")
    if (userID === '' || userID === null)
    {
      navigate('/login')
    }

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [reportData, setReportData] = useState([])
    const [flag, setFlag] = useState(0)
    var dataArray = []

    const [recoveryDate, setRecoveryDate] = useState()

    // For Modal to display - Adding response to notification
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function convertToISO(date)
    {
        var getDate = new Date(date.toISOString().split('T')[0])
        getDate.setDate(getDate.getDate())
        var isoDate = getDate.toISOString()
        return isoDate
    }

    useEffect(() => {
        // const dataFetch = async () => {
        //     
        // };
        
        // dataFetch();

    }, []);

    const handleGetRecoveryReport = async() => {
        setReportData([])
        var isoDate = convertToISO(recoveryDate)
        const res = await fetch('http://localhost:8080/admin/getRecoveryReport', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "date": isoDate
                })
            });
            const dataF = await res;
            dataF.json().then((result) => {
                // console.log(result);
                for (let i = 0; i < result.length; i += 1) {
                    let dataJson = {}
                    dataJson.id = i + 1
                    dataJson.name = result[i].clientInfo.name
                    dataJson.plotNo = result[i].propInfo.plotNumber
                    dataJson.amountReceived = result[i].receivedAmount
                    dataJson.amountLeft = result[i].leftAmount
                    dataJson.amountShort = result[i].shortAmount
                    dataJson.contact = result[i].clientInfo.contact
                    // dataArray = Object.assign({selected: false}, dataJson)
                    dataArray.push(dataJson)
                }
                // console.log(dataArray);
                // dataArray.json().then((r) => {
                setReportData(dataArray)
                console.log(reportData);
                setFlag(1)
                // })
            })
                .catch((err) => {
                    console.log(err)
                })
            // setData(dataF)
    }

    const handlePrint = () => {
        
        const reportContent = ReportTemplate();

        const printWindow = window.open('', '_blank');
        
        printWindow.document.write(reportContent);
    
        // printWindow.document.close();
        printWindow.print();
      };

    const ReportTemplate = () => {
        return `
          <html>
            <head>
              <title>Expense Report</title>
              <link rel="preload" href="./logo.png" as="image">
             
              <style>
                /* Add your custom styles here */

.report {
    font-family: Arial, sans-serif;
  }
  
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .header img {
    height: 50px;
    margin-right: 20px;
  }
  
  table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 20px;
  }
  
  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  
  th:last-child {
    text-align: left;
    font-size: italic;
  }
  
  h1 {
    font-size: 24px;
    margin: 0;
  }
  
  p {
    margin: 0;
    font-size: 16px;
    color: #888;
  }
  
                body {
                  font-family: Arial, sans-serif;
                  font-size: 12px;
                }
                .header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 20px;
                  background-color: #eee;
                }
                .logo img {
                  height: 50px;
                  width: auto;
                }

                .title{

                    font-size: 24px;
                    margin: 0;
                    align-items: center;
                  padding: 20px;

                }
                
              </style>
            </head>
            <body>
              <div class="header">
                <div class="logo">
                  <img src="./logo.png"  alt="Company Logo"/>
                </div>
                <div class="title">Recovery Report</div>
              </div>
              <div class="content">
                <table class="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Plot No</th>
                      <th>Amount Received</th>
                      <th>Amount Left</th>
                      <th>Amount Short</th>
                      <th>Contact</th>
                    </tr>
                  </thead>
                  <tbody>

                    ${reportData.map((data) => `
                      <tr>
                        <td>${data.id}</td>
                        <td>${data.plotNo}</td>
                        <td>${data.amountReceived}</td>
                        <td>${data.amountLeft}</td>
                        <td>${data.amountShort}</td>
                        <td>${data.contact}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </body>
          </html>
        `;
      };
    const columns = [
        { field: "id", headerName: "ID", type: "number" },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "plotNo",
            headerName: "Plot No",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "amountReceived",
            type: "number",
            headerName: "Amount Received",
            flex: 1,
        },
        {
            field: "amountLeft",
            type: "number",
            headerName: "Amount Left",
            flex: 1,
        },
        {
            field: "amountShort",
            type: "number",
            headerName: "Amount Short",
            flex: 1,
        },
        {
            field: "contact",
            headerName: "Contact",
            flex: 1,
        }
    ];

    if (flag === 0)
        return (


         
            
            <Modal
                open={open}
                onClose={handleClose}
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


position= 'absolute'
top= '25%'
left= '45%'
// transform='translate(-50%, -50%)'


sx={{
    
    width:400,
    height:300,
  borderRadius: '16px',
  boxShadow: 20
 
}}
>

<Typography
                    variant="h4"
                    color={colors.greenAccent[500]}
                    fontWeight="bold"
                     sx={{ mt: "20px", ml:"50px" , justifyContent:"center", alignItems:"center" }}
                  >

                   Choose Date

    

<LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={recoveryDate}
                            onChange={(newValue) => {
                                setRecoveryDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params}
                                label="Date"
                                sx={{ gridColumn: "span 3" , width:"8cm",mt:"15%",ml:"9%"}}
                                variant="filled"
                                value={recoveryDate}
                                name="date"
                            />
                            }
                        />
                    </LocalizationProvider>

</Typography>


       <Box display="flex"  mt="30px"  alignItems="center" >
                      <Button type="submit" color="secondary" variant="contained" sx={{ width: "3cm" , mt:"65%",ml:"-150%"}}
                     onClick={handleGetRecoveryReport} >


                    <SendIcon sx={{ color: colors.primary[500], fontSize: "26px" }}/>
     
                      </Button>

                      </Box> 

</Box>
</Box>








                {/* <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={recoveryDate}
                            onChange={(newValue) => {
                                setRecoveryDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params}
                                label="Date"
                                sx={{ gridColumn: "span 4" }}
                                variant="filled"
                                value={recoveryDate}
                                name="date"
                            />
                            }
                        />
                    </LocalizationProvider>
                    <Button onClick={handleGetRecoveryReport} color="secondary">Send</Button>

                </Box> */}




                
   
            </Modal>

        )

    return (
        <Box mb="20px" sx={{ pt: 2 }}>

            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Recovery Report" subtitle="Recovery Report" />
            </Box>

            <Box
                m="40px 0 0 0"
                height="75vh"

                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >



<Box display="flex" justifyContent="right" mt="0px" alignItems="space-between">
                <LocalPrintshopIcon onClick={handlePrint}  sx={{ color: colors.greenAccent[500], fontSize: "35px" }}/>
               </Box> 

                <DataGrid display="flex" justifyContent="space-between" alignItems="center" rows={reportData} columns={columns}  />
            </Box>
        </Box>
    );



}

export default RecoveryReport