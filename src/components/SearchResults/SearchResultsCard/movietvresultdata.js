import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineFileImage } from "react-icons/ai";
import { IoMdRemoveCircleOutline, IoMdAddCircleOutline } from "react-icons/io";
import { useGlobalContext } from "../../../context";

const MovieTVResultData = ({
    id,
    linkTo,
    img,
    title,
    release,
    overview,
    type,
    found,
    add,
}) => {
    const { addToWatchList, removeFromWatchList, convertDate } =
        useGlobalContext();
    return (
        <div className="search-results">
            <Link to={linkTo} className="image-link-container">
                {img === null ? (
                    <div className="search-img">
                        <AiOutlineFileImage
                            className="btn-icon"
                            aria-hidden={true}
                            focusable={false}
                        />
                    </div>
                ) : (
                    <img
                        className="search-img"
                        src={`https://image.tmdb.org/t/p/w500/${img}`}
                        alt=""
                    />
                )}
            </Link>
            <div className="search-info">
                <Link to={linkTo} className="title-link">
                    <h3 className="search-title">{title}</h3>
                </Link>
                <p className="search-release-date">{convertDate(release)}</p>
                <p className="search-overview">{overview}</p>
            </div>
            <div>
                <button
                    className="remove-from-wishlist"
                    onClick={() => {
                        found
                            ? removeFromWatchList(type, id)
                            : addToWatchList(type, add);
                    }}
                >
                    {found ? (
                        <IoMdRemoveCircleOutline
                            className="remove-icon"
                            aria-hidden={true}
                            focusable={false}
                        />
                    ) : (
                        <IoMdAddCircleOutline
                            className="add-icon"
                            aria-hidden={true}
                            focusable={false}
                        />
                    )}
                </button>
            </div>
        </div>
    );
};

export default MovieTVResultData;
