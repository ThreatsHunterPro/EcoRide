import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../../Layouts/Header';
import Footer from '../../Layouts/Footer';
import CityInput from '../../Shared/CityInput';
import Button from "../../../components/Shared/Button";

export default function TripsPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [departure, setDeparture] = useState(searchParams.get('departure') || '');
    const [destination, setDestination] = useState(searchParams.get('destination') || '');
    const [departureDate, setDepartureDate] = useState(searchParams.get('departureDate') || new Date().toISOString().split('T')[0]);
    const [formError, setFormError] = useState(null);
    const [filterEco, setFilterEco] = useState(false);
    const [maxPrice, setMaxPrice] = useState(100);

    useEffect(() => {
        fetchTrips(departure, destination, departureDate);
    }, []); 

    const fetchTrips = async (dep, dest, date) => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams({ departure: dep, destination: dest, departureDate: date }).toString();
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/trips/search?${params}`);
            if (!response.ok) throw new Error('Erreur réseau');
            
            const result = await response.json();
            setTrips(result.data || []);
        } catch (err) {
            setError("Impossible de charger les trajets.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (!departure || !destination || !departureDate) {
            setFormError("Veuillez remplir tous les champs.");
            return;
        }
        if (departure.toLowerCase() === destination.toLowerCase()) {
            setFormError("Le départ et l'arrivée doivent être différents.");
            return;
        }

        navigate(`/trips?departure=${departure}&destination=${destination}&departureDate=${departureDate}`);
        fetchTrips(departure, destination, departureDate);
    };

    const handlePrev = () => {
        navigate("/");
    };

    const filteredTrips = trips.filter(trip => {
        return (!filterEco || trip.is_electric) && (trip.price <= maxPrice);
    });

    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-50">
            <Header />
                <main className="flex-grow max-w-6xl w-full mx-auto p-6">
                    
                    <div className="mb-4">
                        <Button
                            type="button"
                            onClick={handlePrev}
                            label="← Retour"
                            variant="text"
                           className="text-gray-600 hover:text-green-600 font-medium px-0"
                        />
                    </div>

                    {formError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8 flex items-center shadow-sm">
                            <span className="mr-2">⚠️</span>
                            <span className="font-medium">{formError}</span>
                        </div>
                    )}

                    {/* Formulaire de recherche mis à jour */}
                    <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow-sm border mb-4 flex flex-col md:flex-row gap-4 items-end">
                        <CityInput label="Départ" value={departure} onChange={setDeparture} placeholder="Marseille" />
                        <CityInput label="Arrivée" value={destination} onChange={setDestination} placeholder="Bordeaux" />
                        <input 
                            type="date" 
                            className="border p-2 rounded-lg"
                            value={departureDate} 
                            onChange={(e) => setDepartureDate(e.target.value)} 
                        />
                        <button type="submit" className="bg-green-600 text-white p-2 rounded-lg px-6 h-[42px]">
                            Chercher
                        </button>
                    </form>

                    <h1 className="text-2xl font-bold text-green-900 mb-6">Trajets disponibles</h1>

                    {loading && <p>Recherche...</p>}
                    {!loading && !error && trips.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {trips.map((trip) => (
                                <div key={trip.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                                    <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <img 
                                        src={trip.driver?.avatar || "/default-avatar.png"} 
                                        className="w-10 h-10 rounded-full object-cover" 
                                        alt="conducteur" 
                                        />
                                        <div>
                                        <p className="font-bold text-sm">{trip.driver?.pseudo || "Conducteur"}</p>
                                        <p className="text-xs text-yellow-500">★ {trip.driver?.rating || "N/A"}</p>
                                        </div>
                                    </div>
                                    {/* Badge Écologique (US 3) */}
                                    {trip.is_electric && (
                                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                                        Voyage Éco
                                        </span>
                                    )}
                                    </div>

                                    {/* Horaires et Prix */}
                                    <div className="flex justify-between items-center">
                                    <div className="text-lg font-bold text-[#1a5c2a]">
                                        {trip.departure_time?.slice(0,5)} ➔ {trip.arrival_time?.slice(0,5)}
                                    </div>
                                    <div className="text-xl font-bold">{trip.price} €</div>
                                    </div>

                                    {/* Places et Détail */}
                                    <div className="flex justify-between items-center pt-2 border-t">
                                    <span className="text-xs text-gray-500">{trip.seats} places disponibles</span>
                                    <Button 
                                        label="Détail" 
                                        variant="secondary" 
                                        onClick={() => navigate(`/trip/${trip.id}`)} // Vers US 5
                                    />
                                    </div>
                                </div>
                                ))}
                        </div>
                    )}
                </main>
            <Footer />
        </div>
    );
}