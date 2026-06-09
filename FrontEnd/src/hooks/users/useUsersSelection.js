import { useState, useCallback } from 'react';

export function useUsersSelection(users) {
  const [selectMode, setSelectMode] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectMode = useCallback(() => {
    setSelectMode(prev => !prev);
    setSelectedUsers(new Set());
    setSelectAll(false);
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selectAll) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map(u => u.user_id)));
    }
    setSelectAll(prev => !prev);
  }, [selectAll, users]);

  const toggleSelectUser = useCallback((userId) => {
    setSelectedUsers(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(userId)) newSelected.delete(userId);
      else newSelected.add(userId);
      return newSelected;
    });
  }, []);

  const handleConsultUser = useCallback((userId) => {
    const user = users.find(u => u.user_id === userId);
    if (!user) return;

    alert(`${user.firstname} ${user.lastname}`);
  }, [users]);

  const handleConsultSelected = useCallback(() => {
    if (selectedUsers.size === 1) {
      const id = [...selectedUsers][0];
      handleConsultUser(id);
    } else {
      alert("Veuillez sélectionner un seul utilisateur pour consulter.");
    }
  }, [selectedUsers, handleConsultUser]);

  return {
    selectMode,
    selectedUsers,
    selectAll,
    toggleSelectMode,
    toggleSelectUser,
    toggleSelectAll,
    handleConsultUser,
    handleConsultSelected,
    setSelectedUsers,
  };
}
