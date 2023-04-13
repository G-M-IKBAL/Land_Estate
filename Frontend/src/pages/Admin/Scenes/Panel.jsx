
import React, { useState, useEffect } from 'react'
import Header from "../components/Header";
import { tokens } from "../Themes";

import { Box, Typography, useTheme, Button, TextField } from "@mui/material";
import { mockDataTeam } from "../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { DataGrid } from "@mui/x-data-grid";
import Modal from '@mui/material/Modal';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";


import CancelIcon from '@mui/icons-material/Cancel';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  cnic: yup.string().required("cnic is Mendatory"),
  address: yup.string().required("required"),
  username: yup.string().required("required"),
  password: yup.string().required("required"),

});

var initialValues = {
  name: "G M IQBAL",
  contact: "03106956050",
  cnic: "36304-25444430-7",
  address: "House 11, St 12, Model Town, Multan",
  username: "gmiqbal",
  password: "11223344",
};




const checkoutSchema_e = yup.object().shape({
  name_e: yup.string().required("required"),
  gaurdian_e: yup.string().required("required"),
  contact_e: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  cnic_e: yup.string().required("cnic is Mendatory"),
  address_e: yup.string().required("required"),

});


var initialValues_c = {
  name_e: "sdsd",
  gaurdian_e: "sdsds",
  contact_e: "dsdsds",
  cnic_e: "dsdsd",
  address_e: "dsdsd",

};



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


//  function BasicModal() {
//     const [open, setOpen] = useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     return (
//       <div>
//         <Button onClick={handleOpen}>Open modal</Button>
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <Typography id="modal-modal-title" variant="h6" component="h2">
//               Text in a modal
//             </Typography>
//             <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//               Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//             </Typography>
//           </Box>
//         </Modal>
//       </div>
//     );
//   }


const Panel = () => {


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [employeeData, setEmployeeData] = useState([])
  const [clientData, setClientData] = useState([])


  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

  const [selectedEmployee, setselectedEmployee] = useState([])
  const [selectedClient, setselectedClient] = useState([])


  const handleEmployeeSet = (params) => {
    setselectedEmployee(params.row)
    initialValues.name = params.row.name
    initialValues.contact = params.row.contact
    initialValues.cnic = params.row.CNIC
    initialValues.address = params.row.address
    initialValues.username = ""
    initialValues.password = ""
  }

  const handleClientSet = (params) => {
    setselectedClient(params.row)
    console.log(params.row);
    initialValues_c.name_e = params.row.name
    initialValues_c.contact_e = params.row.contact
    initialValues_c.cnic_e = params.row.cnic
    initialValues_c.address_e = params.row.address
    initialValues_c.gaurdian_e = params.row.gaurdian
  }

  const submitEmployee = () => {
    // console.log(initialValues);
  }

  const handleOpen = () => {

    setOpen(true);
  };

  const handleClose = () => {

    setOpen(false);
  };


  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {

    setOpen1(false);
  };

  const handleFormSubmit = async (values) => {
    // Employees will be updated here!
    console.log(values);
    console.log(selectedEmployee._id);

    const resSubmitEmployee = await fetch('http://localhost:8080/admin/updateEmployee', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "id": selectedEmployee._id,
        "name": values.name,
        "contact": values.contact,
        "cnic": values.cnic,
        "address": values.address,
        "username": values.username,
        "password": values.password
      })
    })
    if (resSubmitEmployee.status === 200) {
      alert('Successfully Updated!')
    }
    else {
      alert('Update Error!')
    }

  }

  const handleFormSubmit1 = async (values) => {
    // Clients will be updated here!

    const resSubmitEmployee = await fetch('http://localhost:8080/admin/updateClient', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "id": selectedClient._id,
        "name": values.name_e,
        "contact": values.contact_e,
        "cnic": values.cnic_e,
        "address": values.address_e,
        "gaurdian": values.gaurdian_e
      })
    })
    if (resSubmitEmployee.status === 200) {
      alert('Successfully Updated!')
    }
    else {
      alert('Update Error!')
    }
  }

  const isNonMobile = useMediaQuery("(min-width:600px)");


  const columns = [

    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "contact",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "CNIC",
      headerName: "CNIC",
      flex: 1,
    },
    {

      headerName: "Update",
      flex: 1,


      renderCell: () => {


        return (

          <Box
            width="60%"

            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={

              colors.greenAccent[600]

            }
            borderRadius="5px"
          >



            <Button type="submit" color="secondary" variant="contained" sx={{ width: "4cm" }} onClick={() => handleOpen()}>
              UPDATE
            </Button>

          </Box>
        );
      },


    },
  ];

  useEffect(() => {
    const dataFetch = async () => {

      const resEmployeeData = await fetch('http://localhost:8080/admin/getEmployees', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        })
      })

      const resClientData = await fetch('http://localhost:8080/admin/getClients', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        })
      })

      const eData = await resEmployeeData.json()
      for (let index = 0; index < eData.length; index++) {
        eData[index].id = index + 1
      }
      const cData = await resClientData.json()
      for (let index = 0; index < cData.length; index++) {
        cData[index].id = index + 1
      }
      setEmployeeData(eData)
      setClientData(cData)

    };

    dataFetch();
  }, []);

  const columns1 = [

    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "contact",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "cnic",
      headerName: "CNIC",
      flex: 1,
    },
    {

      headerName: "Update",
      flex: 1,


      renderCell: () => {


        return (

          <Box
            width="60%"

            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={

              colors.greenAccent[600]

            }
            borderRadius="5px"
          >



            <Button type="submit" color="secondary" variant="contained" sx={{ width: "4cm" }} onClick={() => handleOpen1()}>
              UPDATE
            </Button>

          </Box>
        );
      },


    },
  ];






  return (
    <Box mb="20px" sx={{ pt: 2 }}>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Control Panel" subtitle="Admin Control Panel to update infromation" />
      </Box>

      <div style={{ margin: 50 }}>

        <Header title="Employee" subtitle="Update Employee" />

        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"

        >

          <Box
            gridColumn="span 12"
            gridRow="span 3"
            backgroundColor={colors.primary[400]}
            sx={{ borderRadius: '16px', boxShadow: 20 }}
          >

            <Box
              mt="25px"
              p="0 30px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >


              <Box
                m="0 0 0 0"
                height="50vh"
                width="500vh"



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
                {/* components={{ Toolbar: GridToolbar }} */}


                {/* <Button onClick={handling_Modal}>checking</Button> */}



                <DataGrid display="flex" justifyContent="space-between" alignItems="center" rows={employeeData} columns={columns} onRowClick={handleEmployeeSet} />

                <Modal
                  open={open}
                  onClose={handleClose}
                >

                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="160px"
                    gap="20px"

                  >
                    <Box
                      gridColumn="span 10"
                      gridRow="span 4"
                      backgroundColor={colors.primary[400]}
                      sx={{ borderRadius: '16px', boxShadow: 20, ml: 40, mt: 5 }}
                    >

                      <Box

                        mt="25px"
                        p="0 30px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >


                        <Formik

                          onSubmit={(values, { resetForm }) => {

                            handleFormSubmit(values)
                            resetForm({ values: '' })

                          }}
                          initialValues={initialValues}
                          validationSchema={checkoutSchema}
                        >
                          {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                          }) => (
                            <form onSubmit={handleSubmit}>


                              <CancelIcon sx={{ color: colors.redAccent[400], fontSize: "40px", ml: 100 }} onClick={handleClose} />

                              <Box
                                display="grid"
                                gap="30px"
                                mt="-40px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                }}
                              >

                                <TextField
                                  fullWidth
                                  variant="filled"
                                  type="text"
                                  label="Name"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.name}
                                  name="name"
                                  error={!!touched.name && !!errors.name}
                                  helperText={touched.name && errors.name}
                                  sx={{ gridColumn: "span 28", marginTop: 8 }}
                                />

                                <TextField
                                  fullWidth
                                  variant="filled"
                                  type="text"
                                  label="Contact Number"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.contact}
                                  name="contact"
                                  error={!!touched.contact && !!errors.contact}
                                  helperText={touched.contact && errors.contact}
                                  sx={{ gridColumn: "span 28" }}
                                />

                                <TextField
                                  fullWidth
                                  variant="filled"
                                  type="text"
                                  label="CNIC"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.cnic}
                                  name="cnic"
                                  error={!!touched.cnic && !!errors.cnic}
                                  helperText={touched.cnic && errors.cnic}
                                  sx={{ gridColumn: "span 28" }}
                                />

                                <TextField
                                  fullWidth
                                  variant="filled"
                                  type="text"
                                  label="Address"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.address}
                                  name="address"
                                  error={!!touched.address && !!errors.address}
                                  helperText={touched.address && errors.address}
                                  sx={{ gridColumn: "span 28" }}
                                />

                                <TextField
                                  fullWidth
                                  variant="filled"
                                  type="text"
                                  label="Give Employee a Username"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.username}
                                  name="username"
                                  error={!!touched.username && !!errors.username}
                                  helperText={touched.username && errors.username}
                                  sx={{ gridColumn: "span 28" }}
                                />

                                <TextField
                                  fullWidth
                                  variant="filled"
                                  type="text"
                                  label="Give Employee a Password"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.password}
                                  name="password"
                                  error={!!touched.password && !!errors.password}
                                  helperText={touched.password && errors.password}
                                  sx={{ gridColumn: "span 28" }}
                                />

                              </Box>


                              <Box
                                sx={{ pt: 2 }}
                              />



                              <Box display="flex" justifyContent="center" mt="20px" alignItems="center" >
                                <Button type="submit" color="secondary" variant="contained" sx={{ width: "5cm" }} >

                                  <DoneOutlineIcon sx={{ color: colors.primary[500], fontSize: "40px" }} onClick={submitEmployee} />

                                </Button>
                              </Box>





                              {/* <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
																		<Alert onClose={handleClose} severity="success"  sx={{ width: '100%' }}>
			 															Employe Registered Successfully
				 														</Alert>
				 													</Snackbar>


                                   <Snackbar open={open1} autoHideDuration={3000} onClose={handleClose1}>
																		<Alert onClose={handleClose1} severity="error"  sx={{ width: '100%' }}>
			 															Fail to Register Employee Please Try Again
				 														</Alert>
				 													</Snackbar> */}




                              {/* <Box display="flex" justifyContent="center" mt="-600px"  alignItems="center">
                     
                     
                    </Box> */}





                            </form>
                          )}
                        </Formik>

                      </Box>
                    </Box>
                  </Box>



                </Modal>





              </Box>




            </Box>
          </Box>

        </Box>

      </div>





      <div style={{ margin: 50 }}>

        <Header title="Client" subtitle="Update Client" />

        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"

        >

          <Box
            gridColumn="span 12"
            gridRow="span 3"
            backgroundColor={colors.primary[400]}
            sx={{ borderRadius: '16px', boxShadow: 20 }}
          >

            <Box
              mt="25px"
              p="0 30px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >


              <Box
                m="0 0 0 0"
                height="50vh"
                width="500vh"



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
                {/* components={{ Toolbar: GridToolbar }} */}


                {/* <Button onClick={handling_Modal}>checking</Button> */}



                <DataGrid display="flex" justifyContent="space-between" alignItems="center" rows={clientData} columns={columns1} onRowClick={handleClientSet} />

                <Modal
                  open={open1}
                  onClose={handleClose1}
                >

                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="160px"
                    gap="20px"

                  >

                    <Box
                      gridColumn="span 10"
                      gridRow="span 4"
                      backgroundColor={colors.primary[400]}
                      sx={{ borderRadius: '16px', boxShadow: 20, ml: 40, mt: 5 }}
                    >

                      <Box

                        mt="25px"
                        p="0 30px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >


                        <Formik

                          onSubmit={(values, { resetForm }) => {

                            handleFormSubmit1(values)
                            resetForm({ values: '' })

                          }}
                          initialValues={initialValues_c}
                          validationSchema={checkoutSchema_e}
                        >
                          {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                          }) => (
                            <form onSubmit={handleSubmit}>


                              <CancelIcon sx={{ color: colors.redAccent[400], fontSize: "40px", ml: 100 }} onClick={handleClose1} />


                              <Box
                                display="grid"
                                gap="30px"
                                mt="-40px"

                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                  "& > div": { gridColumn: isNonMobile ? undefined : "span 8" },
                                }}

                              >
                                <TextField
                                  fullWidth
                                  variant="filled"
                                  type="text"
                                  label="Name"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.name_e}
                                  name="name_e"
                                  error={!!touched.name_e && !!errors.name_e}
                                  helperText={touched.name_e && errors.name_e}
                                  sx={{ gridColumn: "span 28", marginTop: 8 }}

                                />

                                <TextField
                                  fullWidth
                                  variant="filled"
                                  type="text"
                                  label="Gaurdian"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.gaurdian_e}
                                  name="gaurdian_e"
                                  error={!!touched.gaurdian_e && !!errors.gaurdian_e}
                                  helperText={touched.gaurdian_e && errors.gaurdian_e}
                                  sx={{ gridColumn: "span 28" }}
                                />
                                <TextField
                                  fullWidth
                                  variant="filled"
                                  type="text"
                                  label="Contact Number"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.contact_e}
                                  name="contact_e"
                                  error={!!touched.contact_e && !!errors.contact_e}
                                  helperText={touched.contact_e && errors.contact_e}
                                  sx={{ gridColumn: "span 28" }}
                                />

                                <TextField
                                  fullWidth
                                  variant="filled"
                                  type="text"
                                  label="CNIC"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.cnic_e}
                                  name="cnic_e"
                                  error={!!touched.cnic_e && !!errors.cnic_e}
                                  helperText={touched.cnic_e && errors.cnic_e}
                                  sx={{ gridColumn: "span 28" }}
                                />

                                <TextField
                                  fullWidth
                                  variant="filled"
                                  type="text"
                                  label="Address"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.address_e}
                                  name="address_e"
                                  error={!!touched.address_e && !!errors.address_e}
                                  helperText={touched.address_e && errors.address_e}
                                  sx={{ gridColumn: "span 28" }}
                                />

                              </Box>

                              <Box
                                sx={{ pt: 2 }}
                              />

                              <Box display="flex" justifyContent="center" mt="20px" alignItems="center" >
                                <Button type="submit" color="secondary" variant="contained" sx={{ width: "5cm" }} >

                                  <DoneOutlineIcon sx={{ color: colors.primary[500], fontSize: "40px" }} />

                                </Button>
                              </Box>


                              {/* <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
																		<Alert onClose={handleClose} severity="success"  sx={{ width: '100%' }}>
			 															Client Registered Successfully
				 														</Alert>
				 													</Snackbar>


                                   <Snackbar open={open1} autoHideDuration={3000} onClose={handleClose1}>
																		<Alert onClose={handleClose1} severity="error"  sx={{ width: '100%' }}>
			 															Fail to Register Client Please Try Again
				 														</Alert>
				 													</Snackbar> */}



                              {/* <Snackbar open={open} autoHideDuration={100} onClose={handleClose}>
																		<Alert onClose={handleClose} severity="error"  sx={{ width: '100%' }}>
			 															Fail to Register
				 														</Alert>
				 													</Snackbar>   */}















                            </form>
                          )}
                        </Formik>

                      </Box>
                    </Box>
                  </Box>



                </Modal>





              </Box>




            </Box>
          </Box>

        </Box>

      </div>

    </Box>


  );

}

export default Panel;