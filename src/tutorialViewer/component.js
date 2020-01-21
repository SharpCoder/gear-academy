import React from "react";
import { SectionHeader } from "./sectionHeader";
import { Explorer } from "./explorer";

const TutorialViewer = ({ learningContent }) => {
    return (
        <div className="tutorial-wrapper">
            <SectionHeader category="Spur Gears" heading="Diametral Pitch" />
            <Explorer crumb={learningContent} />
        </div>
    );
};

export { TutorialViewer };
