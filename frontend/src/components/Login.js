import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Navbar from "./Navbar";
import "./Login.css";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);

  const [credentials,setcredentials]=useState({
    name:"",
    email:"",
    phoneno:"",
    password:""
  });

  const handlesubmit= async(e)=>{
    e.preventDefault();

    const  response=await fetch(`http://localhost:5000/api/users/register`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        phoneno: credentials.phoneno,
        password : credentials.password

      })
    });

    const json=await response.json();
    console.log(json);
    if(json.success){
      alert(" you have successfully signed up");
    }else if(json.error){
      alert("validation error: "+ json.error[0].msg);
    }else{
      alert("enter valid credentails");
    }
  };

  const onchange=(event)=>{
    setcredentials({...credentials,[event.target.name]:event.target.value});
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-toggle">
          <button
            onClick={() => setIsSignup(false)}
            className={!isSignup ? "active" : ""}
          >
            Login
          </button>
          <button
            onClick={() => setIsSignup(true)}
            className={isSignup ? "active" : ""}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handlesubmit} className="auth-form">
          {isSignup && (
            <>
              <input type="text" placeholder="User Name"  id="name" name="name" value={credentials.name} onChange={onchange} required />
              <input type="email" placeholder="Email" id="email" name="email" value={credentials.email} onChange={onchange} required />
              <input type="text" placeholder="Phone Number" id="phoneno" name="phoneno" value={credentials.phonno} onChange={onchange} required />
              <input type="password" placeholder="Password" id="password" name="password" value={credentials.password} onChange={onchange} required />
              <button type="submit">Sign Up</button>
              <Link to="/Login" className="">already a user</Link>
            </>
          )}

          {!isSignup && (
            <>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
