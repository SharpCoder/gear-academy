import "./index.css";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { filter, get, keys, map } from "lodash";
import { pathize } from "./utils";

import { Header } from "./header";
import { Footer } from "./footer";

import * as tutorials from "../_learningContent/**/*.md";
import { TutorialViewer } from "./tutorialViewer";
import Context from "./utils/context";
import { SidePanel } from "./sidePanel";
import { Explorer } from "./tutorialViewer/explorer";

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
    const [menuOpened, setMenuOpened] = useState(undefined);
    const [selectedTutorialKey, setSelectedTutorialKey] = useState(window.location.hash);
    const [currentTutorial, setCurrentTutorial] = useState(findSelectedTutorial(tutorials, window.location.hash));

    useEffect(() => {
        if (tutorials) {
            setCurrentTutorial(findSelectedTutorial(tutorials, selectedTutorialKey));
        }
    }, [selectedTutorialKey, tutorials]);

    useEffect(() => {
        const fn = () => {
            if (menuOpened) {
                setMenuOpened(false);
            }
        };

        window.addEventListener("click", fn);
        return () => {
            window.removeEventListener("click", fn);
        };
    });

    if (!tutorials) {
        return <React.Fragment />;
    } else {
        return (
            <div className="flexy">
                <Header
                    title="Gear Academy"
                    toggleMenu={() => {
                        setMenuOpened(!menuOpened);
                    }}
                />
                <SidePanel open={menuOpened}>
                    <Explorer
                        tutorials={tutorials}
                        setSelectedTutorial={key => {
                            window.location.hash = key;
                            setSelectedTutorialKey(key);
                        }}
                    />
                </SidePanel>
                <TutorialViewer context={appContext} currentTutorial={currentTutorial} />
                <Footer>Fork us on github! etc etc.</Footer>
            </div>
        );
    }
};

var mountNode = document.getElementById("app");
ReactDOM.render(<WebApp />, mountNode);
