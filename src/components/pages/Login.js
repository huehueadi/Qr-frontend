import React, { useState } from 'react';
import axios from 'axios';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  

  
  const handleSubmit = async (e) => {
    e.preventDefault();  
    setError(null);  
    setLoading(true);  

    try {
        // Make sure username and password are set
        if (!username || !password) {
            setError("Username and password are required.");
            setLoading(false);
            return;
        }

        const response = await axios.post(
          'http://localhost:3000/api/user_login',
          {
              userID: username,
              userPassword: password
          },
          {
              withCredentials: true,
              headers: {
                  'Content-Type': 'application/json' // Set Content-Type header
              }
          }
      );  


        console.log(response.data);

        if (response.data.success) {
            localStorage.setItem('token', response.data.token);
            console.log('Login successful:', response.data);
            window.location.href = '/qrmanagement';  
        } else {
            setError(response.data.message);
        }
    } catch (error) {
        setError(error.response ? error.response.data.message : 'An error occurred. Please try again.'); // Use detailed error message
        console.error('Error logging in:', error);
    } finally {
        setLoading(false);  
    }
};


  return (
    <div className="authentication-bg bg-primary">
      <div className="home-center">
        <div className="home-desc-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6 col-xl-5">
                <div className="card">
                  <div className="card-body">
                    <div className="px-2 py-3">
                      <div className="text-center">
                        <img src="assets/images/logo-light.png" height={22} alt="logo" />
                        <h5 className="text-primary mb-2 mt-4">Welcome Back!</h5>
                        <p className="text-muted">Sign in to continue to DYST.</p>
                      </div>
                      <form className="form-horizontal mt-4 pt-2" onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="username">Username</label>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}  // Disable input during loading
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="userpassword">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="userpassword"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}  // Disable input during loading
                          />
                        </div>
                        <div className="mb-3">
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="customControlInline" disabled={loading} />
                            <label className="form-label" htmlFor="customControlInline">Remember me</label>
                          </div>
                        </div>
                        <div>
                          <button
                            className="btn btn-primary w-100 waves-effect waves-light"
                            type="submit"
                            disabled={loading}  // Disable button during loading
                          >
                            {loading ? 'Logging in...' : 'Log In'}  {/* Show loading state */}
                          </button>
                        </div>
                        {error && <div className="mt-3 text-danger">{error}</div>} {/* Error message */}
                        <div className="mt-4 text-center">
                          <a href="auth-recoverpw.html" className="text-muted"><i className="mdi mdi-lock me-1" /> Forgot your password?</a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="mt-5 text-center text-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
