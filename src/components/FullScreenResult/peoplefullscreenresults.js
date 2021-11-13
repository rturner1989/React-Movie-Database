import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";
import {
    AiOutlineFileImage,
    AiOutlineClose,
    AiOutlineExpandAlt,
} from "react-icons/ai";
import { GiExpand } from "react-icons/gi";
import { Link } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const PeopleFullScreenResult = () => {
    const { id } = useParams();
    const [peopleData, setPeopleData] = useState({});
    const [peopleCreditData, setPeopleCreditData] = useState({});
    const [peopleImageData, setPeopleImageData] = useState({});
    const [toggle, setToggle] = useState({ category: "credit" });
    const [expandImg, setExpandImg] = useState(false);
    const [imgModal, setImgModal] = useState(null);
    const [mobilePersonToggle, setMobilePersonToggle] = useState({
        category: "biography",
    });

    const {
        convertDate,
        expandBiography,
        setExpandBiography,
        modalContent,
        setModalContent,
    } = useGlobalContext();

    const [windowDimensions] = useWindowDimensions();

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

    const personContentToggle = () => {
        switch (mobilePersonToggle.category) {
            case "biography":
                return (
                    <div className="mobile-fullscreen-biography">
                        <div className="mobile-person-info">
                            <div className="mobile-person-info-div">
                                <h4 className="mobile-person-info-title">
                                    Birthdate:
                                </h4>
                                <p className="mobile-person-info-para">
                                    {convertDate(peopleData.birthday)}
                                </p>
                            </div>
                            <div className="mobile-person-info-div">
                                <h4 className="mobile-person-info-title">
                                    Place of Birth:
                                </h4>
                                <p className="mobile-person-info-para">
                                    {peopleData.place_of_birth}
                                </p>
                            </div>
                            <div className="mobile-person-info-div">
                                <h4 className="mobile-person-info-title">
                                    Known For:
                                </h4>
                                <p className="mobile-person-info-para">
                                    {peopleData.known_for_department}
                                </p>
                            </div>
                        </div>
                        <div className="mobile-person-biography">
                            <h3>Biography</h3>
                            <p className="mobile-person-bio-content">
                                {peopleData.biography}
                            </p>
                            <button
                                className="mobile-person-expand-btn"
                                onClick={() => {
                                    setExpandBiography(!expandBiography);
                                    setModalContent(peopleData.biography);
                                }}
                            >
                                <AiOutlineExpandAlt
                                    className="expand-icon"
                                    aria-hidden={true}
                                    focusable={false}
                                />
                            </button>
                        </div>
                    </div>
                );
            case "movie":
                return (
                    <div className="mobile-fullscreen-cast">
                        {peopleCreditData.cast !== undefined ? (
                            peopleCreditData.cast.map((cast, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="mobile-cast-credit"
                                    >
                                        {cast.poster_path === null ? (
                                            <div className="mobile-cast-btn-icon-container">
                                                <AiOutlineFileImage
                                                    className="cast-btn-icon"
                                                    aria-hidden={true}
                                                    focusable={false}
                                                />
                                            </div>
                                        ) : (
                                            <img
                                                className="mobile-cast-img"
                                                src={`https://image.tmdb.org/t/p/w500/${cast.poster_path}`}
                                                alt=""
                                            />
                                        )}
                                        <Link
                                            to={`/result/movie/${cast.id}`}
                                            className="mobile-cast-role"
                                        >
                                            <p className="mobile-cast-role">
                                                {cast.title}
                                            </p>
                                        </Link>
                                        <p className="mobile-cast-name">
                                            {cast.character}
                                        </p>
                                    </div>
                                );
                            })
                        ) : (
                            <div></div>
                        )}
                    </div>
                );
            case "image":
                return (
                    <div className="mobile-person-fullscreen-images-container">
                        {peopleImageData.profiles !== null ? (
                            peopleImageData.profiles.map((img, index) => {
                                return (
                                    <div
                                        className="mobile-person-img-container"
                                        key={index}
                                    >
                                        <img
                                            className="mobile-person-img"
                                            src={`https://image.tmdb.org/t/p/w500/${img.file_path}`}
                                            alt=""
                                        />
                                        <div
                                            className="person-img-hover"
                                            onClick={() => {
                                                setExpandImg(!expandImg);
                                                setImgModal(
                                                    <img
                                                        key={index}
                                                        className="model-person-img"
                                                        src={`https://image.tmdb.org/t/p/w500/${img.file_path}`}
                                                        alt=""
                                                    />
                                                );
                                            }}
                                        >
                                            <GiExpand
                                                className="person-expand-btn-icon"
                                                aria-hidden={true}
                                                focusable={false}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div></div>
                        )}
                    </div>
                );
            default:
                break;
        }
    };

    if (windowDimensions.width <= 950) {
        return (
            <div className="mobile-fullscreen">
                <div className="mobile-fullscreen-card">
                    {peopleData.profile_path === null ? (
                        <div className="mobile-fullscreen-img">
                            <AiOutlineFileImage
                                className="cast-btn-icon"
                                aria-hidden={true}
                                focusable={false}
                            />
                        </div>
                    ) : (
                        <img
                            className="mobile-fullscreen-img"
                            src={`https://image.tmdb.org/t/p/w500/${peopleData.profile_path}`}
                            alt=""
                        />
                    )}
                    <div className="mobile-fullscreen-section-container">
                        <h1 className="mobile-fullscreen-title">
                            {peopleData.name}
                        </h1>
                        <nav className="mobile-fullscreen-header-container">
                            <ul className="mobile-fullscreen-header">
                                <li
                                    className={`mobile-toggle-btn mobile-overview-btn ${
                                        mobilePersonToggle.category ===
                                        "biography"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setMobilePersonToggle({
                                            category: "biography",
                                        })
                                    }
                                    disabled={
                                        mobilePersonToggle.category ===
                                        "biography"
                                    }
                                >
                                    Biography
                                </li>
                                <li
                                    className={`mobile-toggle-btn mobile-cast-btn ${
                                        mobilePersonToggle.category === "movie"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setMobilePersonToggle({
                                            category: "movie",
                                        })
                                    }
                                    disabled={
                                        mobilePersonToggle.category === "movie"
                                    }
                                >
                                    Movie
                                </li>
                                <li
                                    className={`mobile-toggle-btn mobile-review-btn ${
                                        mobilePersonToggle.category === "image"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setMobilePersonToggle({
                                            category: "image",
                                        })
                                    }
                                    disabled={
                                        mobilePersonToggle.category === "image"
                                    }
                                >
                                    Images
                                </li>
                            </ul>
                        </nav>
                        {personContentToggle()}
                    </div>
                    <div
                        className={
                            expandBiography
                                ? "modal-biography-active"
                                : "modal-biography-hidden"
                        }
                    >
                        <button
                            className="model-exit-btn"
                            onClick={() => setExpandBiography(false)}
                        >
                            <AiOutlineClose
                                className="model-btn-icon"
                                aria-hidden={true}
                                focusable={false}
                            />
                        </button>
                        <p className="modal-biography">{modalContent}</p>
                    </div>
                    <div
                        className={
                            expandImg ? "modal-img-active" : "modal-img-hidden"
                        }
                    >
                        <button
                            className="model-img-exit-btn"
                            onClick={() => setExpandImg(!expandImg)}
                        >
                            <AiOutlineClose
                                className="model-btn-icon"
                                aria-hidden={true}
                                focusable={false}
                            />
                        </button>
                        <div className="modal-img">{imgModal}</div>
                    </div>
                </div>
            </div>
        );
    }

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
                        <div className="person-info">
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
                        </div>
                        <div className="person-biography">
                            <h3>Biography</h3>
                            <p className="person-bio-content">
                                {peopleData.biography}
                            </p>
                            <button
                                className="person-bio-expand-btn"
                                onClick={() => {
                                    setExpandBiography(!expandBiography);
                                    setModalContent(peopleData.biography);
                                }}
                            >
                                <AiOutlineExpandAlt
                                    className="expand-icon"
                                    aria-hidden={true}
                                    focusable={false}
                                />
                            </button>
                        </div>
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
                                        <div className="person-img-container">
                                            <img
                                                key={index}
                                                className="person-img"
                                                src={`https://image.tmdb.org/t/p/w500/${img.file_path}`}
                                                alt=""
                                            />
                                            <div
                                                className="person-img-hover"
                                                onClick={() => {
                                                    setExpandImg(!expandImg);
                                                    setImgModal(
                                                        <img
                                                            key={index}
                                                            className="model-person-img"
                                                            src={`https://image.tmdb.org/t/p/w500/${img.file_path}`}
                                                            alt=""
                                                        />
                                                    );
                                                }}
                                            >
                                                <GiExpand
                                                    className="person-expand-btn-icon"
                                                    aria-hidden={true}
                                                    focusable={false}
                                                />
                                            </div>
                                        </div>
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
            <div
                className={
                    expandBiography
                        ? "modal-biography-active"
                        : "modal-biography-hidden"
                }
            >
                <button
                    className="model-exit-btn"
                    onClick={() => setExpandBiography(false)}
                >
                    <AiOutlineClose
                        className="model-btn-icon"
                        aria-hidden={true}
                        focusable={false}
                    />
                </button>
                <p className="modal-biography">{modalContent}</p>
            </div>
            <div
                className={expandImg ? "modal-img-active" : "modal-img-hidden"}
            >
                <button
                    className="model-img-exit-btn"
                    onClick={() => setExpandImg(!expandImg)}
                >
                    <AiOutlineClose
                        className="model-btn-icon"
                        aria-hidden={true}
                        focusable={false}
                    />
                </button>
                <div className="modal-img">{imgModal}</div>
            </div>
        </div>
    );
};

export default PeopleFullScreenResult;
