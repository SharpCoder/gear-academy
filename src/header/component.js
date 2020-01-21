import React from "react";

const Header = ({ title }) => {
    return (
        <div className="header">
            <div className="title">{title}</div>
        </div>
    );
};

export { Header };
