import "./index.css";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { filter, get, keys, map } from "lodash";
import { pathize, indexTutorials } from "./utils";

import { Navigation } from "./navigation";
import { Footer } from "./footer";

import * as tutorials from "../_learningContent/**/*.md";
import { TutorialViewer } from "./tutorialViewer";
import Context from "./utils/context";

const appContext = new Context();
window.appContext = appContext;

const parsedTutorials = indexTutorials(tutorials);

const WebApp = () => {
    const [selectedTutorialKey, setSelectedTutorialKey] = useState(window.location.hash);
    const [currentTutorial, setCurrentTutorial] = useState(parsedTutorials.cached[window.location.hash]);

    useEffect(() => {
        if (tutorials) {
            setCurrentTutorial(parsedTutorials.cached[selectedTutorialKey]);
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
                <Navigation title="Gear Academy" tutorials={parsedTutorials} />
                <TutorialViewer context={appContext} currentTutorial={currentTutorial} items={parsedTutorials.items} />
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
