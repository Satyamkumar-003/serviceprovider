import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);

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

        <form className="auth-form">
          {isSignup && (
            <>
              <input type="text" placeholder="User Name" required />
              <input type="email" placeholder="Email" required />
              <input type="text" placeholder="Phone Number" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Sign Up</button>
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
