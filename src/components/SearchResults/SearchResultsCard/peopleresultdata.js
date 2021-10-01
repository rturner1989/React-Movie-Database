import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineFileImage } from "react-icons/ai";

const PeopleResultData = ({ person }) => {
    return (
        <div className="person-search-results">
            <Link
                to={`/result/people/${person.id}`}
                className="person-image-container"
            >
                {person.profile_path === null ? (
                    <AiOutlineFileImage
                        className="btn-icon"
                        aria-hidden={true}
                        focusable={false}
                    />
                ) : (
                    <img
                        className="person-search-img"
                        src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                        alt=""
                    />
                )}
            </Link>
            <div className="person-search-info">
                <Link
                    to={`/result/people/${person.id}`}
                    className="person-name"
                >
                    {person.name}
                </Link>
                <p className="person-known-for">
                    {person.known_for_department}
                </p>
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
