// src/components/Search/TripSearchBar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CityInput from "../Shared/CityInput";
import DateInput from "../Shared/DateInput";
import Button from "../Shared/Button";
import SwapButton from "../Shared/SwapButton";
import pinIcon from "../../assets/pinIcon.png";
import calendarIcon from "../../assets/calendar.png";

export default function TripSearchBar() {
    const navigate = useNavigate();
    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState(new Date().toISOString().split("T")[0]);
    const [formError, setFormError] = useState(null);

    const handleSearch = () => {
        setFormError(null);
        if (!departure || !destination) {
            setFormError("Veuillez remplir les villes de départ et d'arrivée.");
            return;
        }
        if (departure.toLowerCase() === destination.toLowerCase()) {
            setFormError("Le départ et l'arrivée doivent être différents.");
            return;
        }

        const params = new URLSearchParams({ departure, destination, departureDate }).toString();
        navigate(`/trips?${params}`);
    };

    return (
        <div className="w-full bg-transparent p-2 flex flex-col gap-3">
            {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center shadow-sm">
                    ⚠️ {formError}
                </div>
            )}
            
            <div className="relative flex flex-col gap-2">
                <CityInput icon={pinIcon} placeholder="D'où partez-vous ?" value={departure} onChange={setDeparture} onEnter={handleSearch} error={formError} />
                <SwapButton onSwap={() => { setDeparture(destination); setDestination(departure); }}/>
                <CityInput icon={pinIcon} placeholder="Où allez-vous ?" value={destination} onChange={setDestination} onEnter={handleSearch} error={formError} />
            </div>

            <DateInput icon={calendarIcon} value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
            
            <Button label="Rechercher mon trajet" onClick={handleSearch} className="w-full py-3 bg-green-600 text-white rounded-xl" />
        </div>
    );
}