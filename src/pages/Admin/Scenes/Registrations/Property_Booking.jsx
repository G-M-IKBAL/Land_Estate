import { Box, Button, TextField,Select,MenuItem, InputLabel,FormControl } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React,{useState} from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const phoneRegExp =/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


const checkoutSchema = yup.object().shape({
   
    project: yup.string().required("required"),
    date: yup.date().required("required"),
    type: yup.string().required("required"),
    number: yup.number().required("required"),
    price: yup.number().required("required"),
    area: yup.number().required("required"),
    amount: yup.string().required("required"),
    duration: yup.number().required("required"),
    rent: yup.number().required("required")
  
  });

const initialValues = {
   
    project: "",
    date: "",
    type: "",
    price: "",
    area: 0,
    amount:"",
    duration: "",
    rent:""

    
  };


const Property_Booking=()=>{


const names = [
    'Project1',
    'Project2',
    'Project3',
    'Projec4',
    'Projec5',
    'Projec6',
    'Project7'
    
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
          <Header title="Property" subtitle="Create a New User Profile"/>
          </Box>

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
                    label="Project"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    select
                    value={values.project}
                    name="project"
                    error={!!touched.project && !! errors.project}
                    helperText={touched.project && errors.project}
                    sx={{ gridColumn: "span 2" }}
                   
                  >
                   {names.map((name) => (<MenuItem key={name} value={name}> {name} </MenuItem> // data type object
        ))}

        </TextField>

        <TextField
                    fullWidth 
                    variant="filled"
                    type="text"
                    label="Plot Type"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    select
                    value={values.type}
                    name="type"
                    error={!!touched.type && !!errors.type}
                    helperText={touched.type  && errors.type}
                    sx={{ gridColumn: "span 2" }}
                   
                  >
                   {plot_type.map((name) => (<MenuItem key={name} value={name}> {name} </MenuItem> // data type object
        ))}

                </TextField>

                  <TextField

                  

                    fullWidth
                    variant="filled"
                    type="number"
                    label="Plot Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.number}
                    name="number"
                    error={!!touched.number && !!errors.number}
                    helperText={touched.number && errors.number}
                    sx={{ gridColumn: "span 2" }}
                  />
                  
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Rate per merla"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.price}
                    setprice={value}
                    name="price"
                    error={!!touched.price && !!errors.price}
                    helperText={touched.price && errors.price}
                    sx={{ gridColumn: "span 2" }}
                  />

                    <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Area"
                    onBlur={handleBlur}
                    
                    value={values.area}
                    onChange={handleChange}
                   
                    
                    name="area"
                    error={!!touched.area && !!errors.area}
                    helperText={touched.area && errors.area}
                    sx={{ gridColumn: "span 2"}}
                  /> 

                    <TextField

                    inputProps={{
                      readOnly: true,
                      disabled:true,
                    }}

                    fullWidth
                    variant="filled"
                    type="number"
                    label="Totall Amount"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={2000}
                    name="amount"
                    error={!!touched.amount && !!errors.amount}
                    helperText={touched.amount && errors.amount}
                    sx={{ gridColumn: "span 2" }}
                  />


                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Totall Duration in Monthes"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.duration}
                    name="duration"
                    error={!!touched.duration && !!errors.duration}
                    helperText={touched.duration && errors.duration}
                    sx={{ gridColumn: "span 4" }}
                  />

                  
                    <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Rent Per Month"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.rent}
                    name="rent"
                    error={!!touched.rent && !!errors.rent}
                    helperText={touched.rent && errors.rent}
                    sx={{ gridColumn: "span 4" }}
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
        sx={{ gridColumn: "span 4" }}  
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
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Book Propert
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      );

}

export default Property_Booking