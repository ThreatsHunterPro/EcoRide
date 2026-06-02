import { useUsersLogic } from "../../hooks/users/useUsersLogic";
import { useUsersSelection } from "../../hooks/users/useUsersSelection";
import SectionBanner from "../Layouts/SectionBanner";
import UsersToolbar from "../Models/Users/UsersToolbar";
import UsersList from "../Models/Users/UsersList";

export default function UsersSection() {
  const {
    users,
    error,
    loading,
    removeUser,
    removeUsersBulk,
  } = useUsersLogic();

  const {
    selectMode,
    selectedUsers,
    selectAll,
    toggleSelectMode,
    toggleSelectUser,
    toggleSelectAll,
    handleConsultUser,
    handleConsultSelected,
  } = useUsersSelection(users);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Supprimer cet utilisateur ?")) {
      try {
        await removeUser(userId);
      } catch (err) {
        alert(`Erreur : ${err.message}`);
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (window.confirm(`Supprimer ${selectedUsers.size} utilisateur(s) ?`)) {
      try {
        await removeUsersBulk([...selectedUsers]);
      } catch (err) {
        alert(`Erreur : ${err.message}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600">Récupération des utilisateurs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600 mb-4 font-semibold">Oups ! {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Actualiser la page
        </button>
      </div>
    );
  }

  if (!loading && users.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Aucun utilisateur trouvé dans la base de données.</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white" id="utilisateurs">
      <div className="max-w-6xl mx-auto px-4">
        <SectionBanner title="Liste des utilisateurs" />

        <UsersToolbar
          selectMode={selectMode}
          toggleSelectMode={toggleSelectMode}
          selectedUsers={selectedUsers}
          handleConsultSelected={handleConsultSelected}
          handleDeleteSelected={handleDeleteSelected}
        />

        <UsersList
          users={users}
          selectMode={selectMode}
          selectedUsers={selectedUsers}
          selectAll={selectAll}
          onToggleSelect={toggleSelectUser}
          onToggleSelectAll={toggleSelectAll}
          onConsult={handleConsultUser}
          onDeleteUser={handleDeleteUser}
        />
      </div>
    </section>
  );
}
