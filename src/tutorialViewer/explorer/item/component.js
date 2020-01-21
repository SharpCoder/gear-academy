import React from "react";

const Item = ({ category, heading }) => {
    return (
        <div className="section">
            <div className="category">{category}</div>
            <div className="heading">{heading}</div>
        </div>
    );
};

export { Explorer };
