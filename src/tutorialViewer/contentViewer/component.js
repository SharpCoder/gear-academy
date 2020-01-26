import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { get } from "lodash";
import reactPostProcessor from "../../utils/reactPostProcessor";

const ContentViewer = ({ tutorial, context }) => {
    const postProcessed = reactPostProcessor(get(tutorial, "html"));

    useEffect(() => {
        for (const prop in postProcessed.reactComponents) {
            const el = postProcessed.reactComponents[prop];
            if (!el) {
                console.error(`An imported component element in file ${get(tutorial, "meta.title")} is undefined`);
            } else {
                ReactDOM.render(React.createElement(el, { context }), document.getElementById(prop));
            }
        }
    }, [postProcessed]);

    return <div className="textual-content-area" dangerouslySetInnerHTML={{ __html: postProcessed.html }}></div>;
};

export { ContentViewer };
