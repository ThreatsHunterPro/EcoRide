import { FaEye, FaTrashAlt } from "react-icons/fa";
import TableRow from "../../Shared/Tables/TableRow";
import TableCell from "../../Shared/Tables/TableCell";
import Checkbox from "../../Shared/Checkbox";
import Button from "../../Shared/Button";

export default function UserRow({ 
  user, 
  selectMode,
  isSelected, 
  onToggleSelect, 
  onConsult, 
  onDelete 
}) {
  const id = user.user_id;

  return (
    <TableRow selected={isSelected}>
      {selectMode && (
        <TableCell>
          <Checkbox
            checked={isSelected}
            onChange={() => onToggleSelect(id)}
            ariaLabel={`Sélectionner ${user.firstname} ${user.lastname}`}
          />
        </TableCell>
      )}

      <TableCell>{user.firstname} {user.lastname}</TableCell>
      <TableCell className="break-words max-w-xs">{user.email || '-'}</TableCell>
      <TableCell>
        {user.registration_date
          ? new Date(user.registration_date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          : '-'}
      </TableCell>
      <TableCell>{user.role || '-'}</TableCell>
      <TableCell>
        <div className="flex justify-end gap-3 text-gray-600">
          <Button
  onClick={() => onConsult(id)}
  ariaLabel={`Consulter ${user.firstname} ${user.lastname}`}
  variant="none"
  className="hover:text-blue-600 transition p-0"
>
  <FaEye size={18} />
</Button>

<Button
  onClick={() => onDelete(id)}
  ariaLabel={`Supprimer ${user.firstname} ${user.lastname}`}
  variant="none"
  className="hover:text-red-600 transition p-0"
>
  <FaTrashAlt size={18} />
</Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
