import { useState, useEffect, useCallback } from 'react';

export function useAuthLogic() {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken && storedToken !== 'undefined' ? storedToken : null;
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
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

  useEffect(() => {
    if (token) {
      const timeout = setTimeout(() => {
        logout();
      }, 7200000); // 2 hours
      return () => clearTimeout(timeout);
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

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!token) throw new Error('User not authenticated');

      const response = await fetch(`${API_URL}/api/admin/users`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Could not fetch users');
      }

      return Array.isArray(result.data) ? result.data : [];
      
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token, API_URL]);

  const deleteUser = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    try {
      if (!token) throw new Error('User not authenticated');

      const response = await fetch(`${API_URL}/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error deleting user');
      }
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token, API_URL]);

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
    fetchUsers,
    deleteUser,
  };
}