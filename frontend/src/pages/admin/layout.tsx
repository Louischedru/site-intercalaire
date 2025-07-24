import { Navigate, Outlet } from 'react-router-dom';
import { loginTest } from '../../utils';
import { useEffect, useState } from 'react';

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    loginTest(setIsLoggedIn);
  }, []);
  return isLoggedIn ? <Outlet /> : <Navigate to={'/auth'} />;
}
