import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                setData(await response.json());
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);
    return [loading, data, error];
};

export default useFetch;
