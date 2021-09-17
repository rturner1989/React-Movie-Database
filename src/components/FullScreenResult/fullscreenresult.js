import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const FullScreenResult = () => {
    const { id } = useParams();
    const [movieData, setMovieData] = useState({});

    const getMovieData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
        const data = await response.json();
        setMovieData(data);
    };

    useEffect(() => {
        getMovieData();
    }, []);

    return (
        <div>
            <h1>{movieData.title}</h1>
        </div>
    );
};

export default FullScreenResult;
