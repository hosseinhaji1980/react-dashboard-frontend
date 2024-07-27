import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // const response = await axios.post('/api/login', { username, password });
      if (username === 'admin' && password === 'admin') {
        onLogin(); // فراخوانی تابع لاگین
      }
      
    } catch (error) {
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
        <button type="submit" className='inputButton btn btn-primary '>ورود</button>
      </form>
    </div>
  );
}

export default Login;
