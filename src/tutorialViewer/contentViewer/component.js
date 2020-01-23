import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { get } from "lodash";
import reactPostProcessor from "../../utils/reactPostProcessor";

const ContentViewer = ({ tutorial, context }) => {
    const postProcessed = reactPostProcessor(get(tutorial, "html"));

    useEffect(() => {
        for (const prop in postProcessed.reactComponents) {
            const Element = postProcessed.reactComponents[prop];
            ReactDOM.render(<Element context={context} />, document.getElementById(prop));
        }
    }, [postProcessed]);

    return <div dangerouslySetInnerHTML={{ __html: postProcessed.html }}></div>;
};

export { ContentViewer };
