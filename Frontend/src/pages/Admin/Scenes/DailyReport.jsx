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


const DailyReport = () => {


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

  const [dailyDate, setDailyDate] = useState()
  const [town, setTown] = useState('')

  var dataArray = []

  // For Modal to display - Adding response to notification
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function convertToISO(date) {
    var getDate = new Date(date.toISOString().split('T')[0])
    getDate.setDate(getDate.getDate())
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

  const handleGetDailyReport = async () => {
    var isoDate = convertToISO(dailyDate)
    // console.log(isoDate);
    // console.log(town);
    const res = await fetch('http://localhost:8080/admin/getDailyReport', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "date": isoDate,
        "projectId": town
      })
    });
    const dataF = await res;
    dataF.json().then((result) => {
      // console.log(result);
      for (let i = 0; i < result.length; i += 1) {
        let dataJson = {}
        dataJson.id = i + 1
        dataJson.name = result[i].c_id.name
        dataJson.plotNo = result[i].propertyId.plotNumber
        dataJson.monthlyRent = result[i].propertyId.monthlyRent
        dataJson.amountReceived = result[i].amount
        dataJson.contact = result[i].c_id.contact
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
  }


  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
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
                  <img src="./logo.png" alt="Company Logo" />
                </div>
                <div class="title">Daily Report</div>
              </div>
              <div class="content">
                <table class="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Plot No</th>
                      <th>Monthly Rent</th>
                      <th>Amount Received</th>
                      <th>Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${reportData.map((data) => `
                      <tr>
                        <td>${data.id}</td>
                        <td>${data.name}</td>
                        <td>${data.plotNo}</td>
                        <td>rs${data.amountReceived}</td>
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
      field: "monthlyRent",
      headerName: "Monthly Rent",
      flex: 1,
    },
    {
      field: "amountReceived",
      type: "number",
      headerName: "Amount Received",
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
      // open={open}
      // onClose={handleClose}
      >
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
                }}> */}



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

                onChange={(event) => { setTown(event.target.value) }}
                select

              >
                {projectData.map(item => (
                  <MenuItem value={item._id}>{item.name}</MenuItem>
                ))}

              </TextField>

            </Typography>



            {/* 
<Button onClick={handleGetDailyReport} color="secondary">Send</Button> */}


            <Box display="flex" mt="30px" alignItems="center" >
              <Button type="submit" color="secondary" variant="contained" sx={{ width: "3cm", mt: "220%", ml: "-150%" }}
                onClick={handleGetDailyReport} >


                <SendIcon sx={{ color: colors.primary[500], fontSize: "26px" }} />

              </Button>

            </Box>


          </Box>
        </Box>


        {/* <DatePicker
          inputFormat="yyyy-MM"
          views={['year', 'month']}
          label="Year and Month"
          minDate={new Date('2012-03-01')}
          maxDate={new Date('2023-06-01')}
          value={value}
          onChange={setValue}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        /> */}

        {/* <InputLabel id="town-label">Town</InputLabel>
                    <Select
                        labelId="town-label"
                        id="town-select"
                        value={town}
                        label="Town"
                        onChange={(event) => { setTown(event.target.value) }}
                    >
                        {projectData.map(item=> (
                            <MenuItem value={item._id}>{item.name}</MenuItem>
                        ))}
                    </Select> */}











      </Modal>
    )

  return (
    <Box mb="20px" sx={{ pt: 2 }}>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Daily Report" subtitle="Todays Daily Report" />
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

export default DailyReport