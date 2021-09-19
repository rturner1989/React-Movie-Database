import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PeopleFullScreenResult = () => {
    const { id } = useParams();
    const [peopleData, setPeopleData] = useState({});

    const date = new Date(peopleData.birthday);
    const string = date.toLocaleString("default", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const getPeopleData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${id}?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
        const data = await response.json();
        setPeopleData(data);
    };

    useEffect(() => {
        getPeopleData();
    }, []);

    return (
        <div className="fullscreen">
            <div id="people-fullscreen-card">
                <div id="people-fullscreen-img">
                    <img
                        src={`http://image.tmdb.org/t/p/w500/${peopleData.profile_path}`}
                        alt=""
                    />
                </div>
                <div id="people-info">
                    <h1>{peopleData.name}</h1>
                    <h3>Personal Info</h3>
                    <h4>Known For:</h4>
                    <p>{peopleData.known_for_department}</p>
                    <h4>Birthdate:</h4>
                    <p>{string}</p>
                    <h4>Place of Birth:</h4>
                    <p>{peopleData.place_of_birth}</p>
                </div>
                <div id="people-biography">
                    <h3>Biography</h3>
                    <p>{peopleData.biography}</p>
                </div>
            </div>
        </div>
    );
};

export default PeopleFullScreenResult;
