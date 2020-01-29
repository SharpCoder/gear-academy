import React from "react";
import { ContentViewer } from "./contentViewer";
import { DynamicGearViewer } from "../dynamicGearViewer";

// TODO: this seems unnecessarily complicated

const TutorialViewer = ({ currentTutorial, context }) => {
    return (
        <div className="tutorial-wrapper">
            <div className="left-pane">
                <ContentViewer context={context} tutorial={currentTutorial} />
            </div>
            <div className="resize-bar"></div>
            <div className="right-pane">
                <DynamicGearViewer context={context} />
            </div>
        </div>
    );
};

export { TutorialViewer };
