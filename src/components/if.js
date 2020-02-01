import React, { useState, useEffect } from "react";

const If = ({ context, _html, condition }) => {
    const [visible, setVisible] = useState(context[condition]);

    useEffect(() => {
        const fn = () => {
            setVisible(context[condition]);
        };

        context.addEventListener("onGearUpdated", fn);
        return () => {
            context.removeEventListener("onGearUpdated", fn);
        };
    }, []);

    if (visible) {
        return <div dangerouslySetInnerHTML={{ __html: _html }}></div>;
    } else {
        return <React.Fragment />;
    }
};

export { If };
