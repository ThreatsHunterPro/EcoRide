import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-green-600 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-center sm:text-left">
          © {new Date().getFullYear()} EcoRide. Tous droits réservés.
        </div>

        <div className="flex gap-4 text-sm">
          <Link to="/legal" className="hover:underline">
            Mentions légales
          </Link>
          <Link to="/privacy" className="hover:underline">
            Confidentialité
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}