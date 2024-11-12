// // src/components/RequireAuth.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const RequireAuth = ({ children }) => {
//     const token = localStorage.getItem('token'); // Check for the token

//     if (!token) {
//         // Redirect to login if there is no token
//         return <Navigate to="/login" />;
//     }

//     return children; // Render children if token exists
// };

// export default RequireAuth;
