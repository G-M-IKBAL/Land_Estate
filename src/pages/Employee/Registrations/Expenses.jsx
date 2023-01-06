import { Box, Button, TextField,Select,MenuItem, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import React,{useState} from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { tokens } from "../Themes";

const phoneRegExp =/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


const checkoutSchema = yup.object().shape({
   
    project: yup.string().required("required"),
    category: yup.string().required("required"),
    date: yup.date().required("required"),

    amount: yup.number().required("required"),

    description: yup.string().required("required"),
    
  
  });

const initialValues = {
   
    project: "",
    date: "",
    category: "",
    amount:"",

    description:""

  };


const Expenses=()=>{

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

const names = [
    'Project1',
    'Project2',
    'Project3',
    'Projec4',
    'Projec5',
    'Projec6',
    'Project7'
    
  ];



  const categories = [

   'category1',
   'category1',
   'category1',
   'category1',
   'category1'
    
  ];


  const plot_type=[
    'Commercial',
    'Residential'
  ];

    const isNonMobile = useMediaQuery("(min-width:600px)");

  
    const {readOnly} = true;
    const [value, setValue] = useState(null);
    const [area,setarea]=useState(0)
    const [price,setprice]=useState(0)
 
    const handleFormSubmit = (values) => {
      console.log(values);
    };

    return (
    
        <Box>
        <Box mb="20px" sx={{pt:2 }} display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Expense" subtitle="Add Expenses here if any"/>
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
  
              mt="70px"
              ml="20px"
              p="0 30px"
              display="flex"
              justifyContent="left"
              alignItems="left"
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
                  gridTemplateColumns="repeat(12, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                  >

                 <TextField
                    fullWidth 
                    variant="filled"
                    type="text"
                    label="Project"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    select
                    value={values.project}
                    name="project"
                    error={!!touched.project && !! errors.project}
                    helperText={touched.project && errors.project}
                    sx={{ gridColumn: "span 33" }}
                   
                  >
                   {names.map((name) => (<MenuItem key={name} value={name}> {name} </MenuItem> // data type object
        ))}

                </TextField>


                <TextField
                    fullWidth 
                    variant="filled"
                    type="text"
                    label="Category"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    select
                    value={values.category}
                    name="category"
                    error={!!touched.category && !! errors.category}
                    helperText={touched.category && errors.category}
                    sx={{ gridColumn: "span 33" }}
                  >
                   {categories.map((name) => (<MenuItem key={name} value={name}> {name} </MenuItem> // data type object
        ))}

                </TextField>
        
                <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Amount"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="amount"
                    error={!!touched.amount && !!errors.amount}
                    helperText={touched.amount && errors.amount}
                    sx={{ gridColumn: "span 33" }}
                  />


                    <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="description"
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    sx={{ gridColumn: "span 33" }}
                  />   


        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} 
        label="Date"
        type="number"
        
        sx={{ gridColumn: "span 33" }} 
        variant="filled"
        value={values.date}
        onBlur={handleBlur}
        onChange={handleChange}
        name="date"
        error={!!touched.date && !!errors.date}
        helperText={touched.date && errors.date} 
      
      
        />
      }
      />
    </LocalizationProvider> 
   
                </Box>

                <Box
                 sx={{pt:2}}
                 />
             
                <Box display="flex" justifyContent="center"  mt="20px"  alignItems="center" >
                  <Button type="submit" color="secondary" variant="contained"   sx={{ width:"5cm"}} >
                 Add Expense
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

export default Expenses;