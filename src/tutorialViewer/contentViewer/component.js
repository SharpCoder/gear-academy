import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import reactPostProcessor from "../../utils/reactPostProcessor";

const ContentViewer = ({ content, context }) => {
    const postProcessed = reactPostProcessor(content);

    useEffect(() => {
        for (const prop in postProcessed.reactComponents) {
            const el = postProcessed.reactComponents[prop];
            if (!el) {
                console.error(`An imported component element is undefined`);
            } else {
                ReactDOM.render(React.createElement(el, { context }), document.getElementById(prop));
            }
        }
    }, [postProcessed]);

    return <div className="textual-content-area" dangerouslySetInnerHTML={{ __html: postProcessed.html }}></div>;
};

export { ContentViewer };
