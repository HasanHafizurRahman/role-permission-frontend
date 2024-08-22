import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Extract token and role from the response
      const { token, role } = response.data;
      console.log('Login Response:', response.data);

      // Store the token and role in the auth context
      login(token, role);

      // Redirect the user based on their role
      setTimeout(() => {
        if (role === 'admin') {
          console.log('Redirecting to /admin');
          navigate('/admin');
        } else {
          console.log('Redirecting to /user');
          navigate('/user');
        }
      }, 100);  // Add a delay before navigating

    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
