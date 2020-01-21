import React from "react";
import ReactDOM from "react-dom";
import { Header } from "./header";
import { TutorialViewer } from "./tutorialViewer";
import "./index.css";

class WebApp extends React.Component {
    render() {
        return (
            <div>
                <Header title="Gears Academy" />
                <TutorialViewer />
            </div>
        );
    }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<WebApp />, mountNode);
