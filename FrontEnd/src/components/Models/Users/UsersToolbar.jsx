import { FaCheckSquare } from 'react-icons/fa';
import Button from '../../Shared/Button';

export default function UsersToolbar({
  selectMode,
  toggleSelectMode,
  selectedUsers,
  handleConsultSelected,
  handleDeleteSelected,
}) {
  return (
    <div className="mb-4 flex justify-end items-center space-x-2">
      <Button
        onClick={handleConsultSelected}
        label="Consulter"
        disabled={selectedUsers.size !== 1}
        variant="filled"
        className="h-9 px-4 bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 flex items-center justify-center"
      />

      <Button
        onClick={handleDeleteSelected}
        label="Supprimer"
        disabled={selectedUsers.size === 0}
        variant="filled"
        className={`h-9 px-4 bg-red-600 hover:bg-red-700 flex items-center justify-center transition
          ${selectedUsers.size > 0 ? "opacity-100 cursor-pointer" : "opacity-40 cursor-not-allowed"}
        `}
      />

      <Button
        onClick={toggleSelectMode}
        aria-label={selectMode ? "Désactiver la sélection" : "Activer la sélection"}
        variant="filled"
        className={`p-2 h-9 w-6 flex items-center justify-center rounded transition
          ${selectMode ? "bg-blue-600" : "bg-blue-400"}
          active:scale-95
        `}
      >
        <FaCheckSquare />
      </Button>
    </div>
  );
}
