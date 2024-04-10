import { createContext, useEffect, useRef, useState, useCallback } from 'react';
import { queryKeys } from '../react-query/constants';
import { getLoginToken, getStoredUser, setStoredUser } from '../storage';
import { getDecodedJWT, isAuthenticated } from '../utils';
import { useQueryClient } from '@tanstack/react-query';

export const AuthContext = createContext({
  user: '',
  email: '',
  token: '',
  role: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  cart: [],
  setCart: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [cart, setCart] = useState(
    localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
  );
  const queryClient = useQueryClient();
  const logoutTimer = useRef(null);

  const logout = useCallback(() => {
    setUser(undefined);
    setAuthToken(undefined);
    localStorage.clear();
    queryClient.invalidateQueries([queryKeys.user]);
  }, [queryClient]);

  useEffect(() => {
    if (!isAuthenticated()) {
      logout();
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const data = getLoginToken();
    if (data) {
      setAuthToken(data);
    }
  }, []);

  useEffect(() => {
    const data = getStoredUser();
    if (data) {
      setUser(data);
    }
  }, []);

  function authenticate(data) {
    setAuthToken(data);
    const decoded = getDecodedJWT(data);
    setUser(decoded);
    setStoredUser(decoded);
  }
  useEffect(() => {
    function resetLogoutTimer() {
      clearTimeout(logoutTimer.current);
      logoutTimer.current = setTimeout(logout, 30 * 60 * 1000);
    }

    if (authToken) {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
      logoutTimer.current = setTimeout(logout, 30 * 60 * 1000);
      window.addEventListener('mousemove', resetLogoutTimer);
      window.addEventListener('mousedown', resetLogoutTimer);
      window.addEventListener('keypress', resetLogoutTimer);
      window.addEventListener('scroll', resetLogoutTimer);
      window.addEventListener('touchmove', resetLogoutTimer);
    }

    return () => {
      window.removeEventListener('mousemove', resetLogoutTimer);
      window.removeEventListener('mousedown', resetLogoutTimer);
      window.removeEventListener('keypress', resetLogoutTimer);
      window.removeEventListener('scroll', resetLogoutTimer);
      window.removeEventListener('touchmove', resetLogoutTimer);
      clearTimeout(logoutTimer);
    };
  }, [authToken, logout]);

  const value = {
    user: user,
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    cart: cart,
    setCart: setCart,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
