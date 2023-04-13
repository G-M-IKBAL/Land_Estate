
import '../../styles/login.css'
import logo from './img/log.svg'
import register_img from './img/register.svg'
import useMediaQuery from "@mui/material/useMediaQuery";
// import './fontAwesome'
import React from 'react';
//import './styles/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, Box } from '@material-ui/core'
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";



// <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css"></link>
import AccountCircle from '@mui/icons-material/AccountCircle';

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useState } from 'react';

import { Formik } from "formik";
import * as yup from "yup";



import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function timeout(delay) {
	return new Promise(res => setTimeout(res, delay));
}


const checkoutSchema = yup.object().shape({

	email: yup.string().required("Required"),
	password: yup.string().required("Required")


});


const initialValues = {

	email: "",
	password: ""


};

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function Login() {


	const [open, setOpen] = React.useState(false);
	const [open1, setOpen1] = React.useState(false);


	const handleClick = () => {
		setOpen(true);
	};


	const handleClick1 = () => {
		setOpen1(true);
	};


	const handleClose = (event, reason) => {
		// if (reason === 'clickaway') {
		//   return;
		// }

		setOpen(false);
	};


	const handleClose1 = (event, reason) => {
		// if (reason === 'clickaway') {
		//   return;
		// }

		setOpen1(false);
	};



	sessionStorage.setItem("userID", '');
	sessionStorage.setItem("userRole", '');

	const navigate = useNavigate();

	const paperStyle = { padding: 20, height: '50vh', width: 400, margin: "20px auto" }
	const avatarStyle = { backgroundColor: '#1bbd7e' }
	const btnstyle = { margin: '8px 0' }

	const isNonMobile = useMediaQuery("(min-width:600px)");

	const handleFormSubmit = (values) => {
		const makeLogin = async () => {
			const res = await fetch('http://localhost:8080/login', {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					username: values.email,
					password: values.password
				})
			});


			if (res.status === 200) {


				handleClick()

				await timeout(2500)


				res.json().then((result) => {
					// console.log(result);
					sessionStorage.setItem("userID", result[0].person_id._id);
					sessionStorage.setItem("userName", result[0].person_id.name);
					sessionStorage.setItem("userRole", result[0].role);
					// console.log(sessionStorage.getItem('userID'));
					// console.log(sessionStorage.getItem('userName'));
					// console.log(sessionStorage.getItem('userRole'));
					if (result[0].role === 'admin') {
						navigate('/home')
						navigate(0)
					}

					else {
						navigate('/expense')
						navigate(0)
					}
				})




			}
			else {



				handleClick1()




			}
		};

		makeLogin();



	};

	return (
		<>

			<div className="container">
				<div className="forms-container">
					<div className="signin-signup">
						<Grid>
							<Paper elevation={10} style={paperStyle}>
								<Grid align='center'>
									<Avatar style={avatarStyle} sx={{ fontWeight: 20 }}><LockOutlinedIcon /></Avatar>
									<h2 style={{ fontWeight: 800 }}>Sign In</h2>
								</Grid>

								<br></br>

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
													label="Email"
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.email}
													name="email"
													error={!!touched.email && !!errors.email}
													helperText={touched.email && errors.email}


												/>
												<br></br>
												<br></br>


												<TextField
													fullWidth
													variant="filled"
													type='password'
													label="Password"
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.password}
													name="password"
													error={!!touched.password && !!errors.password}
													helperText={touched.password && errors.password}


													inputProps={{ maxLength: 12, minLength: 4 }}



												/>

												<FormControlLabel
													control={
														<Checkbox
															name="checkedB"
															color="primary"
														/>
													}
													label="Remember me"
												/>
												<br></br>
												<Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>





											</Box>

										</form>
									)}
								</Formik>




							</Paper>
						</Grid>



					</div>
				</div>

				<div className="panels-container">
					<div className="panel left-panel">
						<div className="content">
						</div>
						<img src={logo} className="image" alt="" />
					</div>

				</div>
			</div>

			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
					Success Redirecting...
				</Alert>
			</Snackbar>


			<Snackbar open={open1} autoHideDuration={3000} onClose={handleClose1}>
				<Alert onClose={handleClose1} severity="error" sx={{ width: '100%' }}>
					Email or Password is wrong
				</Alert>
			</Snackbar>

		</>

	);


}

export default Login