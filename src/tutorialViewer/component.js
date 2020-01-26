import React, { useState, useEffect } from "react";
import { SectionHeader } from "./sectionHeader";
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
            <SectionHeader category="" heading={get(currentTutorial, "meta.title")} />
            <div className="mid-wrapper">
                <Explorer
                    selected={selectedTutorialKey}
                    tutorials={tutorials}
                    setSelectedTutorial={key => {
                        window.location.hash = key;
                        setSelectedTutorialKey(key);
                    }}
                />
                <div className="content">
                    <ContentViewer context={context} tutorial={currentTutorial} />
                    <DynamicGearViewer context={context} />
                </div>
            </div>
        </div>
    );
};

export { TutorialViewer };
