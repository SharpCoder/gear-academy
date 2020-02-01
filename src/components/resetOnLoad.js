import React from "react";

const ResetOnLoad = ({ context }) => {
    context.reset();
    return <React.Fragment />;
};

export { ResetOnLoad };
