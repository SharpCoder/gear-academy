import "./index.css";

import zlib from "zlib";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { Header } from "./header";
import { Footer } from "./footer";

import * as tutorials from "../_learningContent/**/*.md";
import { TutorialViewer } from "./tutorialViewer";
import Context from "./utils/context";

const appContext = new Context();
window.appContext = appContext;

const WebApp = () => {
    // const [tutorials, setTutorials] = useState(null);

    // useEffect(() => {
    //     fetch("./lessons.json")
    //         .then(resp => resp.json())
    //         .then(json => setTutorials(json));
    // });

    if (!tutorials) {
        return <React.Fragment />;
    } else {
        return (
            <div className="flexy">
                <Header title="Gear Academy" />
                <TutorialViewer context={appContext} tutorials={tutorials} />
                <Footer>Fork us on github! etc etc.</Footer>
            </div>
        );
    }
};

var mountNode = document.getElementById("app");
ReactDOM.render(<WebApp />, mountNode);
