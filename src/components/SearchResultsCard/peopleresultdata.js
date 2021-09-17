import React from "react";

const PeopleResultData = ({ person }) => {
    return (
        <div id="person-search-results">
            <img
                id="person-img"
                className="search-img"
                src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                alt=""
            />
            <div className="search-info">
                <h3 id="person-name">{person.name}</h3>
                <p id="person-known-for">{person.known_for_department}</p>
                {person.known_for.map((role) => {
                    return (
                        <div key={role.id}>
                            <p>{role.title}</p>
                            <p>{role.release_date}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PeopleResultData;
