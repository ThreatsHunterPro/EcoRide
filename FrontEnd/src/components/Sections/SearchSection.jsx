import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import IconInput from "../Shared/IconInput";
import DateInput from "../Shared/DateInput";
import Button from "../Shared/Button";
import SwapButton from "../Shared/SwapButton";
import pinIcon from "../../assets/pinIcon.png"
import calendarIcon from "../../assets/calendar.png"

export default function RideSearchBar() {
    const navigate = useNavigate();
    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    const handleSwitch = () => {
        const temp = departure;
        setDeparture(destination);
        setDestination(temp);
    };

    const handleDepartureChange = (e) => {
        let newDate = e.target.value;

        if (returnDate && newDate > returnDate) {
            const newReturnDate = newDate;
            newDate = returnDate
            setReturnDate(newReturnDate);
        }

        setDepartureDate(newDate);
    };

    const handleClick = () => {
        const params = new URLSearchParams({
            departure,
            destination,
            departureDate,
            returnDate
        }).toString();
        navigate(`/rides?${params}`);
    };

    const rowStyle = "flex items-center rounded-xl border border-gray-200 hover:border-green-300 shadow-sm";
    const rowDateStyle = `${rowStyle} px-4 py-3`
    const todayDate = new Date().toISOString().split("T")[0]

    return (
        <div className="w-full bg-transparent p-2 flex flex-col gap-3">
            
            <div className="relative flex flex-col gap-2">
                <IconInput
                    icon={pinIcon}
                    name="departure"
                    placeholder="D'où partez-vous ?"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    className={rowStyle}
                />
                
                <SwapButton onSwap={handleSwitch}/>
                
                <IconInput
                    icon={pinIcon}
                    name="destination"
                    placeholder="Où allez-vous ?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className={rowStyle}
                />
            </div>

            <div className="flex gap-2">
                <DateInput 
                    label="Aller"
                    icon={calendarIcon}
                    placeholder="Date de départ"
                    className={rowDateStyle}
                    value={departureDate}
                    min={todayDate}
                    onChange={handleDepartureChange}
                />

                <DateInput 
                    label="Retour"
                    icon={calendarIcon}
                    placeholder="Date de retour"
                    className={rowDateStyle}
                    value={returnDate}
                    min={departureDate || todayDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                />
            </div>

            <Button 
                label="Rechercher"
                onClick={handleClick}
                className="w-full py-3 rounded-xl text-white font-semibold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-100 transition-all" 
            />
        </div>
    );
}