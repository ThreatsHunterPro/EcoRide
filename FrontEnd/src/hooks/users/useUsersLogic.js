import { useState, useEffect } from 'react';
import { useAuthLogic } from '../auth/useAuthLogic';

export function useUsersLogic() {
  const { 
    fetchUsers, 
    deleteUser 
  } = useAuthLogic();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchUsers();
        setUsers(data);
      } 
      
      catch (err) {
        setError(err.message);
      } 
      
      finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, [fetchUsers]);

  const removeUser = async (userId) => {
    setError(null);
    
    console.log(userId); //TODO check if it works
    try {
      await deleteUser(userId);
      setUsers(prevUsers => prevUsers.filter(u => u.user_id !== userId));
    } 
    
    catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeUsersBulk = async (userIds) => {
    setError(null);

    try {
      await Promise.all(userIds.map(id => deleteUser(id)));
      setUsers(prevUsers => prevUsers.filter(u => !userIds.includes(u.user_id)));
    } 
    
    catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    users,
    error,
    loading,
    removeUser,
    removeUsersBulk,
    setUsers,
  };
}
