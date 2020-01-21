import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import { Header } from "./header";
import { TutorialViewer } from "./tutorialViewer";
import { Footer } from "./footer";

import learningContent from "./tutorialContent";

class WebApp extends React.Component {
    render() {
        return (
            <div className="flexy">
                <Header title="Gear Academy" />
                <TutorialViewer learningContent={learningContent} />
                <Footer>Fork us on github! etc etc.</Footer>
            </div>
        );
    }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<WebApp />, mountNode);
