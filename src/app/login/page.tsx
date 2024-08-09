'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; 
import { AUTH_TOKEN } from '../../config';
import { useHandleKeyDown } from '../../hooks/useHandleKeyDown';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
      if (AUTH_TOKEN) {
        const expires = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);
        Cookies.set('authToken', AUTH_TOKEN, { expires });
      } else {
        console.error('AUTH_TOKEN is not defined');
      }
      router.push('/search');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleKeyDown = useHandleKeyDown(handleLogin);
  
  return (
    <div className="flex-center">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="mb-2 px-4 py-2 border rounded-md w-[300px]"
        onKeyDown={handleKeyDown}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-2 px-4 py-2 border rounded-md w-[300px]"
        onKeyDown={handleKeyDown}
      />
      <button className="btn-primary" onClick={handleLogin}>Login</button>
    </div>
  );
}
