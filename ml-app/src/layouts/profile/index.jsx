import React from 'react';
import "./home.css";


export const Login = () => {
  return (
    <div className = "home">
      
      <div className = "loginContainer">
        <h1> Welcome Back!</h1>

        <div className = "input-container">
          <label>Username</label>
          <input type = "text" required />
        </div>

        <div className = "input-container">
          <label>Password</label>
          <input type = "password" required />
        </div>

        <button className ="siG">
          <div>
          <img
            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
            alt="Trees"
            height="25"/>
            </div> 
          <span>Sign in with Google</span>
          </button>

          <button className = "loginBut">
            <p>Login</p>
        </button>

        
        <a href ="#">Forgot Password</a>
        <a href ="/Signin">Create a new account</a>
          </div>  



      </div>
      // </div>

  )
}

// export default Login;

// import React from 'react';
// import "./home.css";

export const Signin = () => {
  return (
    <div className = "home">
      
      <div className = "loginContainer">
        <h1> Create An Account</h1>

        <div className = "input-container">
          <label>Firstname</label>
          <input type = "text" required />
        </div>

        <div className = "input-container">
          <label>Lastname</label>
          <input type = "text" required />
        </div>

        <div className = "input-container">
          <label>Email Address</label>
          <input type = "text" required />
        </div>

        <div className = "input-container">
          <label>Password</label>
          <input type = "password" required />
        </div>

          

        <button className ="siG">
          <div>
          <img
            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
            alt="Trees"
            height="25"/>
            </div> 
          <span>Sign in with Google</span>
          </button>

          <button className = "loginBut">
            <p>Sign in</p>
        </button>

        <a href ="#">Forgot Password</a>
        <a href ="/Login">Login into account</a>
          </div> 

      </div>
      // </div>

  )
}

export default Signin;
