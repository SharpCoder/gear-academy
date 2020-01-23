import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { get } from "lodash";
import reactPostProcessor from "../../utils/markdown-it/reactPostProcessor";

const ContentViewer = ({ tutorial }) => {
    const postProcessed = reactPostProcessor(get(tutorial, "html"));

    useEffect(() => {
        for (const prop in postProcessed.reactComponents) {
            ReactDOM.render(postProcessed.reactComponents[prop](), document.getElementById(prop));
        }
    }, [postProcessed]);

    return <div dangerouslySetInnerHTML={{ __html: postProcessed.html }}></div>;
};

export { ContentViewer };
