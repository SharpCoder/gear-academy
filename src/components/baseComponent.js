import React from "react";

const BaseComponent = ({ children }) => {
    return <div className="injected-component">{children}</div>;
};

export { BaseComponent };
