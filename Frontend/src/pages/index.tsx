import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React from 'react';

const Dashboard = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => router.push('/login')}>Login</button>
      )}
    </div>
  );
};

export default Dashboard;
