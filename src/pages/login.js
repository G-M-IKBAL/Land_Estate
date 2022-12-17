
import '../styles/login.css'

import React from 'react';
import '../styles/fonts/font-awesome-4.7.0/css/font-awesome.min.css'



import { useState } from 'react';
// <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css"></link>





function login(){

    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');
    
    const handlesubmit=(event)=>{

        event.preventDefault();
        // console.log("called")
        console.log(email);
        console.log(pass);

    }

    return (
        <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<div className="login100-pic js-tilt" data-tilt>
					<img src="images/img-01.png" alt="IMG"/>          
				</div>

				<form className="login100-form validate-form" >
					<span className="login100-form-title">
                             <h1>
                                <i className="fa fa-lock"></i>
                                </h1>
                                <h3>Login</h3>  	
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">

						<input className="input100" type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>

						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Password is required">
						<input className="input100" type="password" name="pass" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div className="container-login100-form-btn">
						<button className="login100-form-btn" type='submit' onClick={handlesubmit}>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	

    );
        
       

       
       
     
     
      

    



}

export default login