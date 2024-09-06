import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
const API_URL = process.env.REACT_APP_API_URL;

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      
      // ذخیره ownerid و توکن در localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('ownerid', response.data.ownerid);

      // هدایت به صفحه داشبورد
      onLogin();
    } catch (error) {
      setError('نام کاربری یا کلمه عبور اشتباه است');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='login-box'>
      <h2>پنل مدیریت جم با ما</h2>
      <form onSubmit={handleSubmit}>
        <div className='user-box'>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className='text-end'>نام کاربری</label>
        </div>
        <div className='user-box'>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>کلمه عبور</label>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className='inputButton btn btn-primary '>ورود</button>
      </form>
    </div>
  );
}

export default Login;
