import { Box, Button, TextField,useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React from "react";

import { tokens } from "../../Themes";

const phoneRegExp =/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
      cnic:yup.string().required("cnic is Mendatory"),
    address: yup.string().required("required"),
  
  });

const initialValues = {
    name: "",
    email: "",
    contact: "",
    cnic: "",
    address: "",
    
  };

const Employee_registration=()=>{

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
      console.log(values);
    };

    return (
    
        <Box>

        <Box mb="20px" sx={{pt:2 }} display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Employee" subtitle="Create a New User Profile"/>
          </Box>


          <div style={{margin:50}}>
            
          <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"

          >


          <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          sx={{borderRadius: '16px', boxShadow:20}}
          >

          <Box

            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >

          <Formik
        
            onSubmit={handleFormSubmit}
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
                 
                <Box
                  display="grid"
                  gap="30px"
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
                    sx={{ gridColumn: "span 28" , marginTop:8}}
                  />
                  
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 28" }}
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
                    value={values.address1}
                    name="address"
                    error={!!touched.address && !!errors.address}
                    helperText={touched.address && errors.address}
                    sx={{ gridColumn: "span 28" }}
                  />
                 
                </Box>


                <Box
                 sx={{pt:2}}
                 />
             
                <Box display="flex" justifyContent="center"  mt="20px"  alignItems="center" >
                  <Button type="submit" color="secondary" variant="contained"   sx={{ width:"5cm"}} >
                   New Employee
                  </Button>
                  
              </Box>
                
              </form>
            )}
          </Formik>

          </Box>
        </Box>
      </Box>
    </div>


        </Box>
      );




}

export default  Employee_registration;