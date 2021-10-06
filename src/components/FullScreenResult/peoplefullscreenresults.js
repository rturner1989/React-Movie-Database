import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { AiOutlineFileImage } from "react-icons/ai";
import { Link } from "react-router-dom";

const PeopleFullScreenResult = () => {
    const { id } = useParams();
    const [peopleData, setPeopleData] = useState({});
    const [peopleCreditData, setPeopleCreditData] = useState({});
    const [peopleImageData, setPeopleImageData] = useState({});
    const [toggle, setToggle] = useState({ category: "credit" });

    const { convertDate } = useGlobalContext();

    const getPeopleData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${id}?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
        const data = await response.json();
        setPeopleData(data);
    };

    const getPeopleCreditData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
        const data = await response.json();
        setPeopleCreditData(data);
    };

    const getPeopleImageData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${id}/images?api_key=9ddeebbe780fac8f3f13322ce56a87af`
        );
        const data = await response.json();
        setPeopleImageData(data);
    };

    useEffect(() => {
        getPeopleData();
        getPeopleCreditData();
        getPeopleImageData();
    }, []);

    return (
        <div className="fullscreen">
            <div className="fullscreen-card">
                {peopleData.profile_path === null ? (
                    <div className="fullscreen-img">
                        <AiOutlineFileImage
                            className="cast-btn-icon"
                            aria-hidden={true}
                            focusable={false}
                        />
                    </div>
                ) : (
                    <img
                        className="fullscreen-img"
                        src={`https://image.tmdb.org/t/p/w500/${peopleData.profile_path}`}
                        alt=""
                    />
                )}
                <section className="person-fullscreen-section">
                    <section className="fullscreen-info">
                        <h1 className="fullscreen-title">{peopleData.name}</h1>
                        <section className="person-info">
                            <div className="person-info-div">
                                <h4 className="person-info-title">
                                    Birthdate:
                                </h4>
                                <p className="person-info-para">
                                    {convertDate(peopleData.birthday)}
                                </p>
                            </div>
                            <div className="person-info-div">
                                <h4 className="person-info-title">
                                    Place of Birth:
                                </h4>
                                <p className="person-info-para">
                                    {peopleData.place_of_birth}
                                </p>
                            </div>
                            <div className="person-info-div">
                                <h4 className="person-info-title">
                                    Known For:
                                </h4>
                                <p className="person-info-para">
                                    {peopleData.known_for_department}
                                </p>
                            </div>
                        </section>
                        <section className="person-biography">
                            <h3>Biography</h3>
                            <p className="person-bio-content">
                                {peopleData.biography}
                            </p>
                        </section>
                    </section>
                    <section className="review-cast-btn-container">
                        <div className="review-cast-toggle-button">
                            <button
                                id="cast-btn"
                                className={`fullscreen-toggle-btn cast-btn ${
                                    toggle.category === "credit"
                                        ? "review-cast-active"
                                        : ""
                                }`}
                                onClick={() =>
                                    setToggle({ category: "credit" })
                                }
                            >
                                Movie
                            </button>
                            <button
                                id="review-btn"
                                className={`fullscreen-toggle-btn review-btn ${
                                    toggle.category === "image"
                                        ? "review-cast-active"
                                        : ""
                                }`}
                                onClick={() => setToggle({ category: "image" })}
                            >
                                Images
                            </button>
                        </div>
                    </section>
                    {toggle.category === "credit" ? (
                        <div className="person-fullscreen-cast">
                            {peopleCreditData.cast !== undefined ? (
                                peopleCreditData.cast.map((cast, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="person-credit"
                                        >
                                            {cast.poster_path === null ? (
                                                <div className="cast-btn-icon-container">
                                                    <AiOutlineFileImage
                                                        className="cast-btn-icon"
                                                        aria-hidden={true}
                                                        focusable={false}
                                                    />
                                                </div>
                                            ) : (
                                                <img
                                                    className="person-credit-img"
                                                    src={`https://image.tmdb.org/t/p/w500/${cast.poster_path}`}
                                                    alt=""
                                                />
                                            )}
                                            <Link
                                                to={`/result/movie/${cast.id}`}
                                                className="cast-name"
                                            >
                                                <p className="cast-name">
                                                    {cast.title}
                                                </p>
                                            </Link>
                                            <p className="person-cast-role">
                                                {cast.character}
                                            </p>
                                        </div>
                                    );
                                })
                            ) : (
                                <div></div>
                            )}
                        </div>
                    ) : toggle.category === "image" ? (
                        <div className="person-fullscreen-images-container">
                            {peopleImageData.profiles !== null ? (
                                peopleImageData.profiles.map((img, index) => {
                                    return (
                                        <img
                                            className="person-img"
                                            src={`https://image.tmdb.org/t/p/w500/${img.file_path}`}
                                            alt=""
                                        />
                                    );
                                })
                            ) : (
                                <div></div>
                            )}
                        </div>
                    ) : (
                        <div></div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default PeopleFullScreenResult;
