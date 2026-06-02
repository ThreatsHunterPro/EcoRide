import { Link } from "react-router-dom";
import Dropdown from "../../Shared/Dropdown";
import Button from "../../Shared/Button";
import HorizontalBar from "../../Shared/Bars/HorizontalBar";

export default function UserDropdown({ user, handleLogout }) {
    return (
        <Dropdown>
            <div className="px-4 py-3 font-bold text-gray-800">
                {user?.username || "Mon compte"}
            </div>
            <HorizontalBar color="bg-black" />
            <Link 
                to="/account" 
                className="block px-4 py-3 hover:bg-gray-100">
                    Mon compte
            </Link>
            <Link 
                to="/settings" 
                className="block px-4 py-3 hover:bg-gray-100">
                    Paramètres
            </Link>

            <HorizontalBar />

            <Link 
                to="/legal" 
                className="block px-4 py-3 hover:bg-gray-100">
                    Mentions légales
            </Link>
            <Link 
                to="/privacy" 
                className="block px-4 py-3 hover:bg-gray-100">
                    Confidentialité
            </Link>
            <Link 
                to="/contact" 
                className="block px-4 py-3 hover:bg-gray-100">
                    Contact
            </Link>

            <HorizontalBar />

            <Button
                onClick={handleLogout}
                label="Se déconnecter"
                variant="text"
                fullWidth
                className="text-red-600 font-semibold hover:bg-red-50 px-4 py-3 text-left"
            />
        </Dropdown>
    )
}