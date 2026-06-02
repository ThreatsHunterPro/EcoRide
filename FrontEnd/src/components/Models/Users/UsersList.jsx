import TableHeader from "../../Shared/Tables/TableHeader";
import Checkbox from "../../Shared/Checkbox";
import UserRow from "./UserRow"

export default function UsersList({
  users,
  selectMode,
  selectedUsers,
  selectAll,
  onToggleSelect,
  onToggleSelectAll,
  onConsult,
  onDeleteUser
}) {
  return (
    <table className="min-w-full table-auto border-2 border-gray-400 rounded-lg">
      <thead className="bg-gray-100">
        <tr>
          {selectMode && (
            <TableHeader>
              <Checkbox
                checked={selectAll}
                onChange={onToggleSelectAll}
                ariaLabel="Tout sélectionner"
              />
            </TableHeader>
          )}
          <TableHeader>Prénom NOM</TableHeader>
          <TableHeader>Email</TableHeader>
          <TableHeader>Date d'inscription</TableHeader>
          <TableHeader>Rôle</TableHeader>
          <TableHeader>Gérer</TableHeader>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow
            key={user.user_id}
            user={user}
            selectMode={selectMode}
            isSelected={selectedUsers.has(user.user_id)}
            onToggleSelect={onToggleSelect}
            onConsult={onConsult}
            onDelete={onDeleteUser}
          />
        ))}
      </tbody>
    </table>
  );
}
