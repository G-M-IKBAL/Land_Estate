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


import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';


import logo from './logo.png'


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

const MonthlyReport = () => {

  var temp = "";

  const navigate = useNavigate();
  const userID = sessionStorage.getItem("userID")
  if (userID === '' || userID === null) {
    navigate('/login')
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [reportData, setReportData] = useState([])
  const [flag, setFlag] = useState(0)
  const [projectData, setProjectData] = useState([])
  var dataArray = []

  const [dailyDate, setDailyDate] = useState()
  const [town, setTown] = useState('')

  // For Modal to display - Adding response to notification
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function convertToISO(date) {
    var getDate = new Date(date.toISOString().split('T')[0])
    getDate.setDate(getDate.getDate() + 1)
    var isoDate = getDate.toISOString()
    return isoDate
  }



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



  const handleGetMonthlyReport = async () => {

    console.log(dailyDate.getMonth());
    console.log(dailyDate.getFullYear());
    console.log(town);
    const res = await fetch('http://localhost:8080/admin/getMonthlyReport', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({

        "month": dailyDate.getMonth() + 1,
        "year": dailyDate.getFullYear(),
        "projectId": town
      })
    });


    const dataF = await res;

    temp = dataF


    dataF.json().then((result) => {

      for (let i = 0; i < result.length; i += 1) {
        let dataJson = {}
        dataJson.id = i + 1
        dataJson.name = result[i].c_id.name
        dataJson.plotNo = result[i].propertyId.plotNumber
        dataJson.amountReceived = result[i].amount
        dataJson.date = convertIsoToDate(result[i].date)
        dataJson.contact = result[i].c_id.contact

        dataArray.push(dataJson)
      }

      setReportData(dataArray)
      // console.log(reportData);
      setFlag(1)

    })
      .catch((err) => {
        console.log(err)
      })

  }
  // const [expenses, setExpenses] = useState([

  //     { date: '2022-03-01', description: 'Office supplies', amount: 25.0 },
  //     { date: '2022-03-05', description: 'Team lunch', amount: 100.0 },
  //     { date: '2022-03-10', description: 'Travel expenses', amount: 500.0 },
  //   ]);

  // function sleep(milliseconds) {
  //   const date = Date.now();
  //   let currentDate = null;
  //   do {
  //     currentDate = Date.now();
  //   } while (currentDate - date < milliseconds);
  // }

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
                  <img src="./logo.png" alt="Company Logo" />
                  <div class="title">Expense Report</div>
                </div>
              </div>
              <div class="content">
                <table class="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Plot No</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${reportData.map((data) => `
                      <tr>
                        <td>${data.id}</td>
                        <td>${data.name}</td>
                        <td>${data.plotNo}</td>
                        <td>Rs. ${data.amountReceived}</td>
                        <td>${data.date}</td>
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
      field: "date",
      headerName: "Date",
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


            position='absolute'
            top='25%'
            left='45%'
            // transform='translate(-50%, -50%)'


            sx={{

              width: 400,
              height: 400,
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

              Choose Date & Town



              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  inputFormat="yyyy-MM"
                  views={['year', 'month']}
                  value={dailyDate}
                  onChange={(newValue) => {
                    setDailyDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params}
                    label="Date"
                    sx={{ gridColumn: "span 3", width: "8cm", mt: "15%", ml: "9%" }}
                    variant="filled"
                    value={dailyDate}
                    name="date"
                  />
                  }
                />

              </LocalizationProvider>




              <TextField
                fullWidth
                variant="filled"
                labelId="town-label"
                type="text"
                label="Town"
                sx={{ gridColumn: "span 3", width: "8cm", mt: "15%", ml: "9%" }}
                // onBlur={handleBlur}
                onChange={(event) => { setTown(event.target.value) }}
                select


              >
                {projectData.map(item => (
                  <MenuItem value={item._id}>{item.name}</MenuItem>
                ))}

              </TextField>

            </Typography>

            <Box display="flex" mt="30px" alignItems="center" >
              <Button type="submit" color="secondary" variant="contained" sx={{ width: "3cm", mt: "220%", ml: "-150%" }}
                onClick={handleGetMonthlyReport} >


                <SendIcon sx={{ color: colors.primary[500], fontSize: "26px" }} />

              </Button>

            </Box>

            {/* <Button onClick={handleGetMonthlyReport} color="secondary">Send</Button> */}

          </Box>
        </Box>




      </Modal>
    )

  return (
    <Box mb="20px" sx={{ pt: 2 }}>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Monthly Report" subtitle="Report of selected Date and Month" />
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
        <Box display="flex" justifyContent="right" mt="2px" alignItems="space-between">
          <LocalPrintshopIcon onClick={handlePrint} sx={{ color: colors.greenAccent[500], fontSize: "26px" }} />
        </Box>

        <DataGrid display="flex" justifyContent="space-between" alignItems="center" rows={reportData} columns={columns} />


      </Box>
    </Box>
  );



}

export default MonthlyReport