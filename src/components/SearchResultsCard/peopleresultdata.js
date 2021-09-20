import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineFileImage } from "react-icons/ai";

const PeopleResultData = ({ person }) => {
    return (
        <div id="person-result-card">
            <div id="person-search-results">
                <Link to={`/result/people/${person.id}`}>
                    <div id="person-image-container">
                        {person.profile_path === null ? (
                            <div className="search-img">
                                <AiOutlineFileImage
                                    className="btn-icon"
                                    aria-hidden={true}
                                    focusable={false}
                                />
                            </div>
                        ) : (
                            <img
                                id="person-img"
                                className="search-img"
                                src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                                alt=""
                            />
                        )}
                    </div>
                </Link>
                <div className="search-info">
                    <Link to={`/result/people/${person.id}`}>
                        <h3 id="person-name">{person.name}</h3>
                    </Link>
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
        </div>
    );
};

export default PeopleResultData;
