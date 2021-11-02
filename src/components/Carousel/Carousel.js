import React, { useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const Carousel = ({ children }) => {
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handlePreviousClick = () => {
        const newIndex = activeCardIndex - 1;
        setActiveCardIndex(newIndex < 0 ? children.length - 1 : newIndex);
    };
    const handleNextClick = () => {
        const newIndex = activeCardIndex + 1;
        setActiveCardIndex(newIndex > children.length - 1 ? 0 : newIndex);
    };
    const getPositionClassName = (index) => {
        return index < activeCardIndex
            ? "previous-card"
            : index > activeCardIndex
            ? "next-card"
            : "active-card";
    };
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };
    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };
    const handleTouchEnd = () => {
        if (touchEnd === 0) return;
        if (touchStart - touchEnd > 150) {
            handleNextClick();
        }
        if (touchStart - touchEnd < -150) {
            handlePreviousClick();
        }
        setTouchStart(0);
        setTouchEnd(0);
    };
    return (
        <section
            className="carousel-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {children.length > 1 && (
                <button className="previous-btn" onClick={handlePreviousClick}>
                    <BiLeftArrow
                        className="previous-next-icon"
                        aria-hidden={true}
                        focusable={false}
                    />
                </button>
            )}
            {children.length > 1 && (
                <button className="next-btn" onClick={handleNextClick}>
                    <BiRightArrow
                        className="previous-next-icon"
                        aria-hidden={true}
                        focusable={false}
                    />
                </button>
            )}
            {children.map((child, index) => {
                return (
                    <div
                        className={`carousel-card ${getPositionClassName(
                            index
                        )}`}
                    >
                        {child}
                    </div>
                );
            })}
        </section>
    );
};

export default Carousel;
