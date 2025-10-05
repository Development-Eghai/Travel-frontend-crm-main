import React, { useEffect, useRef } from "react";

export default function CustomModal(props) {
    const ref = useRef(null);
    const { onClickOutside, open, children } = props;

    useEffect(() => {
        if (open) {
            document.documentElement.classList.add("modal-open");
        } else {
            document.documentElement.classList.remove("modal-open");
        }
    }, [open]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [onClickOutside]);

    if (!open) return null;

    return (
        <div className="modal-backdrop">
            <div className="position-relative">
                <i className="fa-solid fa-xmark modal-close-btn cursor-pointer modal-close-btn2"></i>
                <div ref={ref} className="Modal-View">
                    {children}
                </div>
            </div>
        </div>
    );
}
