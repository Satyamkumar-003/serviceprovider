// import React, { useState } from 'react';
// import './Login.css';

// const Login = () => {
//   const [isSignup, setIsSignup] = useState(false);
//   const [loginEmail, setLoginEmail] = useState('');
//   const [loginPassword, setLoginPassword] = useState('');
//   const [signupData, setSignupData] = useState({
//     username: '',
//     email: '',
//     phone: '',
//     password: '',
//   });
//   const [error, setError] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (!loginEmail || !loginPassword) {
//       setError('Please fill in all login fields');
//       return;
//     }
//     setError('');
//     alert('Login successful!');
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();
//     const { username, email, phone, password } = signupData;
//     if (!username || !email || !phone || !password) {
//       setError('Please fill in all signup fields');
//       return;
//     }
//     setError('');
//     alert('Signup successful!');
//   };

//   return (
//     <div className="main">
//       <input
//         type="checkbox"
//         id="chk"
//         checked={isSignup}
//         onChange={() => setIsSignup(!isSignup)}
//         aria-hidden="true"
//       />
//       <div className="signup">
//         <form onSubmit={handleSignup}>
//           <label htmlFor="chk" aria-hidden="true">Sign up</label>
//           <input
//             type="text"
//             name="username"
//             placeholder="User name"
//             value={signupData.username}
//             onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={signupData.email}
//             onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
//             required
//           />
//           <input
//             type="number"
//             name="phone"
//             placeholder="BrojTelefona"
//             value={signupData.phone}
//             onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={signupData.password}
//             onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
//             required
//           />
//           <button type="submit">Sign up</button>
//         </form>
//       </div>

//       <div className="login">
//         <form onSubmit={handleLogin}>
//           <label htmlFor="chk" aria-hidden="true">Login</label>
//           {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={loginEmail}
//             onChange={(e) => setLoginEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={loginPassword}
//             onChange={(e) => setLoginPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
