import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";

const Header = ({ title }) => {
    return (
        <div className="header">
            <div className="title">{title}</div>
            <button aria-label={"View the menu"}>
                <FontAwesomeIcon icon={faBars} size={"2x"} aria-hidden={"true"} />
            </button>
        </div>
    );
};

export { Header };
