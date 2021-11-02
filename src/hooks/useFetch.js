import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [loading, setLoading] = useState(true);
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
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);
    return [data, loading, error];
};

export default useFetch;
