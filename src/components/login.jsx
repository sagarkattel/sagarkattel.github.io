import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';


function Login() {
  // const navigate = useNavigate();

  const [data, setData] = useState({});
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state variable

  const handleEmail = (e) => {
    setData({ ...data, email: e.target.value });
  };

  const handlePassword = (e) => {
    setData({ ...data, password: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const apiResponse = await fetch('https://authenticate-notm.onrender.com/api/v1/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      });

      const result = await apiResponse.json();
      console.log(result);
      setApiResponse(result);
      setIsLoading(false); // Stop loading

      console.log("Hello" + result.success);
      if (result.success === true) {
        // Successful login
        const token = result.token;
        console.log(token);

        const localname = result.message;
        console.log(localname);

        // Save the token to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('localname', localname);

        setIsLoggedIn(true); // Update login status
      } else {
        // Login failed
        console.log(result);
        // Handle the error or display a message to the user
        // For example, you can display an error message on the login form
        setApiResponse('Invalid email or password');
      }
    } catch (error) {
      console.error(error);
      setApiResponse('An error occur during login');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token || isLoggedIn) {
      // navigate('/create');
      window.location.href = '/create';
    }
  }, [isLoggedIn]);

  return (
    <div>
      <h2>Login!</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleEmail} />
        <br />
        <br />
        <input type="password" name="password" placeholder="Password" onChange={handlePassword} />
        <br />
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
      {!isLoading && apiResponse && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Login;
