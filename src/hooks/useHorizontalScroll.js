import { useEffect, useRef } from "react";

const useHorizontalScroll = (preventParentScrolling = true) => {
    const elRef = useRef();
    useEffect(() => {
        const el = elRef.current;
        if (el) {
            const onWheel = (e) => {
                if (e.deltaY === 0) return;
                if (preventParentScrolling === true) {
                    e.preventDefault();
                } else if (
                    !(el.scrollLeft === 0 && e.deltaY < 0) &&
                    !(
                        el.scrollWidth -
                            el.clientWidth -
                            Math.round(el.scrollLeft) ===
                            0 && e.deltaY > 0
                    )
                ) {
                    e.preventDefault();
                }
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY,
                });
            };
            el.addEventListener("wheel", onWheel);
            return () => el.removeEventListener("wheel", onWheel);
        }
    }, []);
    return elRef;
};

export default useHorizontalScroll;
