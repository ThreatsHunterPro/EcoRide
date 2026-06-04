import { useState } from "react";

export function useSearchLogic() {
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');

    return {
        jobTitle,
        setJobTitle,
        location,
        setLocation
    };
}