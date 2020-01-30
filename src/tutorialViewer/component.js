import React from "react";
import { ContentViewer } from "./contentViewer";
import { DynamicGearViewer } from "../dynamicGearViewer";
import { PageNavigator } from "./pageNavigator";

const TutorialViewer = ({ currentTutorial, items, context }) => {
    return (
        <div className="tutorial-wrapper">
            <div className="left-pane">
                <ContentViewer context={context} content={currentTutorial} />
                <PageNavigator currentTutorial={currentTutorial} items={items} />
            </div>
            <div className="resize-bar"></div>
            <div className="right-pane">
                <DynamicGearViewer context={context} />
            </div>
        </div>
    );
};

export { TutorialViewer };
