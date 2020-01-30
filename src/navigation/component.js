import React, { useEffect, useState } from "react";
import { SidePanel } from "./sidePanel";
import { Explorer } from "../tutorialViewer/explorer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";

const Navigation = ({ tutorials, title }) => {
    const [menuOpened, setMenuOpened] = useState(undefined);

    useEffect(() => {
        // Instrument the menu clicking
        const fn = () => {
            if (menuOpened) {
                setMenuOpened(false);
            }
        };

        window.addEventListener("click", fn);
        return () => window.removeEventListener("click", fn);
    });

    return (
        <div className="header">
            <div className="title">{title}</div>
            <button
                aria-label={"View the menu"}
                onClick={() => {
                    setMenuOpened(!menuOpened);
                }}>
                <FontAwesomeIcon icon={faBars} size={"2x"} aria-hidden={"true"} />
            </button>

            <SidePanel open={menuOpened}>
                <Explorer tutorials={tutorials} setSelectedTutorial={key => (window.location.hash = key)} />
            </SidePanel>
        </div>
    );
};

export { Navigation };
