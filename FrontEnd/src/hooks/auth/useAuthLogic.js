import { useState, useEffect, useCallback } from 'react';

const isTokenExpired = (token) => {
  if (!token || token === 'undefined') return true;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const { exp } = JSON.parse(jsonPayload);
    return Date.now() >= exp * 1000;
  } catch (e) {
    return true;
  }
};

export function useAuthLogic() {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !isTokenExpired(storedToken)) {
      return storedToken;
    }
    localStorage.removeItem('token');
    return null;
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    // Si le token est mort, on ne charge pas l'utilisateur
    if (!storedToken || isTokenExpired(storedToken)) {
      localStorage.removeItem('user');
      return null;
    }

    try {
      return storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error('Error parsing user during initialization:', e);
      localStorage.removeItem('user');
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  
  const role_id = user?.role_id || null;
  const isAuthenticated = !!token && !!user;

  const persistAuth = (token, userData) => {
    setToken(token);
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  // Déconnexion automatique basée sur l'expiration réelle du JWT
  useEffect(() => {
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const { exp } = JSON.parse(atob(base64));
        
        const delay = (exp * 1000) - Date.now();
        
        if (delay <= 0) {
          logout();
        } else {
          const timer = setTimeout(() => {
            logout();
          }, delay);
          return () => clearTimeout(timer);
        }
      } catch (e) {
        logout();
      }
    }
  }, [token, logout]);

  const register = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.user && data.token) {
        persistAuth(data.token, data.user);
        return data;
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      if (response.ok && data.token && data.user) {
        persistAuth(data.token, data.user);
        return data;
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    token,
    user,
    role_id,
    isAuthenticated,
    loading,
    error,
    register,
    login,
    logout,
  };
}