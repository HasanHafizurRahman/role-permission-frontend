import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import Register from './components/Register';

const App = () => {
  const { auth } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            auth.token && auth.role === 'admin' ? <AdminPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/user"
          element={
            auth.token && ['user', 'admin'].includes(auth.role) ? <UserPage /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

