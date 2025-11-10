import React, { useState } from "react";
// import { Link } from "react-router-dom";
import "./Login.css";
import {Link, useNavigate} from "react-router-dom";

export default function Login() {
  const navigate=useNavigate();
  const [isSignup, setIsSignup] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phoneno: "",
    password: "",
  });

  // ✅ Signup function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });

    const json = await response.json();
    console.log(json);

    if (response.ok) {
      alert("You have successfully signed up");
      navigate("/login");
    } else {
      alert(json.message || "Enter valid details");
    }
  };

  // ✅ Signup onChange
  const onSignupChange = (event) => {
    setSignupData({
      ...signupData,
      [event.target.name]: event.target.value,
    });
  };

  // ✅ Login function
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const json = await response.json();
    console.log(json);

    if (response.ok) {
      alert("Login Successful!");
      localStorage.setItem("token", json.token);
      localStorage.setItem("user", JSON.stringify(json.user)); // ✅ Store user data
      navigate("/");
    } else {
      alert(json.message || "Invalid login details");
    }
  };

  // ✅ Login onChange
  const onLoginChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
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

        {/* ✅ Form handles signup only */}
        <form onSubmit={isSignup ? handleSubmit : handleLogin} className="auth-form">
          {isSignup ? (
            <>
              <input
                type="text"
                placeholder="User Name"
                name="name"
                value={signupData.name}
                onChange={onSignupChange}
                required
              />

              <input
                type="email"
                placeholder="Email"
                name="email"
                value={signupData.email}
                onChange={onSignupChange}
                required
              />

              <input
                type="text"
                placeholder="Phone Number"
                name="phoneno"
                value={signupData.phoneno}
                onChange={onSignupChange}
                required
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={signupData.password}
                onChange={onSignupChange}
                required
              />

              <button type="submit">Sign Up</button>
            </>
          ) : (
            <>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={loginData.email}
                onChange={onLoginChange}
                required
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={loginData.password}
                onChange={onLoginChange}
                required
              />

              <button type="submit">Login</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
