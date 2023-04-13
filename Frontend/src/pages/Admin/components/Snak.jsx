import { Typography, Box, useTheme } from "@mui/material";
import {tokens} from "../Themes"
import React from 'react'
 

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });



const snak = ({ severity , msg , flag=false}) => {
   
	const [open, setOpen] = React.useState(flag);

	// const handleClick = () => {
	// 	setOpen(true);
	//   };
	
	  const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
	
		setOpen(false);
	  };

    return (
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
		<Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
		{msg}
	   </Alert>
		</Snackbar>
    );
  };
  
  export default snak;