import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import { Header } from "./header";
import { Footer } from "./footer";

import * as tutorials from "../_learningContent/**/*.md";
import { TutorialViewer } from "./tutorialViewer";
import Context from "./utils/context";

const appContext = new Context();
window.appContext = appContext;

class WebApp extends React.Component {
    render() {
        return (
            <div className="flexy">
                <Header title="Gear Academy" />
                <TutorialViewer context={appContext} tutorials={tutorials} />
                <Footer>Fork us on github! etc etc.</Footer>
            </div>
        );
    }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<WebApp />, mountNode);
