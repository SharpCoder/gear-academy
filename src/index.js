import "./index.css";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { filter, get, keys, map } from "lodash";
import { pathize } from "./utils";

import { Navigation } from "./navigation";
import { Footer } from "./footer";

import * as tutorials from "../_learningContent/**/*.md";
import { TutorialViewer } from "./tutorialViewer";
import Context from "./utils/context";

const appContext = new Context();
window.appContext = appContext;

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

const WebApp = () => {
    const [selectedTutorialKey, setSelectedTutorialKey] = useState(window.location.hash);
    const [currentTutorial, setCurrentTutorial] = useState(findSelectedTutorial(tutorials, window.location.hash));

    useEffect(() => {
        if (tutorials) {
            setCurrentTutorial(findSelectedTutorial(tutorials, selectedTutorialKey));
        }
    }, [selectedTutorialKey, tutorials]);

    useEffect(() => {
        const handleHashChange = () => {
            const key = window.location.hash;
            if (key !== selectedTutorialKey) {
                setSelectedTutorialKey(key);
            }
        };

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    });

    if (!tutorials) {
        return <React.Fragment />;
    } else {
        return (
            <div className="flexy">
                <Navigation title="Gear Academy" tutorials={tutorials} />
                <TutorialViewer context={appContext} currentTutorial={currentTutorial} />
                <Footer>Fork us on github! etc etc.</Footer>
            </div>
        );
    }
};

// TODO: separately, handle 404

/* Handle default page loading */
if (window.location.hash === "") {
    window.location.assign("#intro");
}

var mountNode = document.getElementById("app");
ReactDOM.render(<WebApp />, mountNode);
