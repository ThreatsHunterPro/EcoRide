import { useState } from "react";

export function useSearchLogic() {
    const [searchCriteria, setSearchCriteria] = useState({
        departure: '',
        destination: '',
        departureDate: '',
        returnDate: ''
    });

    return {
        searchCriteria,
        setSearchCriteria
    };
}