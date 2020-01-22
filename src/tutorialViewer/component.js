import React from "react";
import { SectionHeader } from "./sectionHeader";
import { Explorer } from "./explorer";

const TutorialViewer = ({ tutorials }) => {
    return (
        <div className="tutorial-wrapper">
            <SectionHeader category="Spur Gears" heading="Diametral Pitch" />
            <div className="mid-wrapper">
                <Explorer tutorials={tutorials} />
                <div className="content"></div>
            </div>
        </div>
    );
};

export { TutorialViewer };
