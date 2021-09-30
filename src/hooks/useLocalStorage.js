import { useState, useEffect } from "react";

const useLocalStorage = (key, initialState) => {
    const [state, setState] = useState(() => {
        const retrieve = localStorage.getItem(key);
        return retrieve ? JSON.parse(retrieve) : initialState;
    });

    useEffect(() => {
        if (state) {
            localStorage.setItem(key, JSON.stringify(state));
        }
    }, [state]);

    return [state, setState];
};

export default useLocalStorage;
