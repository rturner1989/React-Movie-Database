import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TvFullScreenResult = () => {
    const { id } = useParams();
    const [tvData, setTvData] = useState({});

    const date = new Date(tvData.first_air_date);
    const string = date.toLocaleString("default", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const getTvData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/${id}?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
        const data = await response.json();
        setTvData(data);
    };

    useEffect(() => {
        getTvData();
    }, []);

    return (
        <div className="fullscreen">
            <div id="tv-fullscreen-card">
                <div id="tv-fullscreen-img">
                    <img
                        src={`http://image.tmdb.org/t/p/w500/${tvData.poster_path}`}
                        alt=""
                    />
                </div>
                <div id="tv-fullscreen-info">
                    <h1>{tvData.name}</h1>
                    <h3>{tvData.tagline}</h3>
                    <p>{tvData.overview}</p>
                    {tvData.genres !== undefined ? (
                        tvData.genres.map((type) => {
                            return (
                                <div key={type.id} className="genre-name">
                                    <h3>{type.name}</h3>
                                </div>
                            );
                        })
                    ) : (
                        <div></div>
                    )}
                    {tvData.production_companies !== undefined ? (
                        tvData.production_companies.map((company) => {
                            return (
                                <div key={company.id} className="company-name">
                                    <p>{company.name}</p>
                                </div>
                            );
                        })
                    ) : (
                        <div></div>
                    )}
                    <div>
                        <h4>Air Date:</h4>
                        <p>{string}</p>
                    </div>
                    <div>
                        <h4>Number of Seasons:</h4>
                        <p>{tvData.number_of_seasons}</p>
                    </div>
                    <div>
                        <h4>Average Rating:</h4>
                        <p>{tvData.vote_average}/10</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TvFullScreenResult;
