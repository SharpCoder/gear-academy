import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import { Header } from "./header";
import { TutorialViewer } from "./tutorialViewer";
import { Footer } from "./footer";

import transformHtml from "./utils/markdown-it/reactPostProcessor";
import learningContent from "./tutorialContent";

import * as Contents from "../_learningContent/**/*.md";

import { meta, html } from "../_learningContent/pitch.md";

const transformed = transformHtml(html);
console.log(Contents);

class WebApp extends React.Component {
    render() {
        return (
            <div className="flexy">
                <Header title="Gear Academy" />
                <TutorialViewer learningContent={learningContent} />
                <div dangerouslySetInnerHTML={{ __html: transformed.html }}></div>
                <Footer>Fork us on github! etc etc.</Footer>
            </div>
        );
    }

    componentDidMount() {
        for (const prop in transformed.reactComponents) {
            ReactDOM.render(transformed.reactComponents[prop](), document.getElementById(prop));
        }
    }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<WebApp />, mountNode);
