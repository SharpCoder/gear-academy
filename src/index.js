import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import { Header } from "./header";
import { Footer } from "./footer";

import * as tutorials from "../_learningContent/**/*.md";
import { TutorialViewer } from "./tutorialViewer";

console.log(tutorials);

class WebApp extends React.Component {
    render() {
        return (
            <div className="flexy">
                <Header title="Gear Academy" />
                <TutorialViewer tutorials={tutorials} />
                <Footer>Fork us on github! etc etc.</Footer>
            </div>
        );
    }

    // componentDidMount() {
    //     // for (const prop in transformed.reactComponents) {
    //     //     //ReactDOM.render(transformed.reactComponents[prop](), document.getElementById(prop));
    //     // }
    // }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<WebApp />, mountNode);
