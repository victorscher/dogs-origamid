import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import LostPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import { UserContext } from '../../UserContext';

function User() {
  const { login } = React.useContext(UserContext);

  if (login === true) return <Navigate to="/account" />;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default User;
