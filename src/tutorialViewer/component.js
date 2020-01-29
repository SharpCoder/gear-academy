import React, { useState, useEffect } from "react";
import { Explorer } from "./explorer";
import { filter, get, keys, map } from "lodash";
import { pathize } from "./utils";
import { ContentViewer } from "./contentViewer";
import { DynamicGearViewer } from "../dynamicGearViewer";

// TODO: this seems unnecessarily complicated
const findSelectedTutorial = (tutorials, selection) => {
    const result = get(
        map(
            filter(keys(tutorials), key => {
                const title = get(tutorials[key], "meta.title");
                return `#${pathize(title)}` === selection;
            }),
            key => tutorials[key],
        ),
        "[0]",
    );

    return result;
};

const TutorialViewer = ({ tutorials, context }) => {
    const [selectedTutorialKey, setSelectedTutorialKey] = useState(window.location.hash);
    const [currentTutorial, setCurrentTutorial] = useState(findSelectedTutorial(tutorials, window.location.hash));

    useEffect(() => {
        setCurrentTutorial(findSelectedTutorial(tutorials, selectedTutorialKey));
    }, [selectedTutorialKey]);

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

{
    /* <Explorer
selected={selectedTutorialKey}
tutorials={tutorials}
setSelectedTutorial={key => {
    window.location.hash = key;
    setSelectedTutorialKey(key);
}}
/> */
}

export { TutorialViewer };
