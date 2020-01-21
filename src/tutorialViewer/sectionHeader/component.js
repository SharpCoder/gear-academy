import React from "react";

const SectionHeader = ({ category, heading }) => {
    return (
        <div className="section">
            <div className="category">{category}</div>
            <div className="heading">{heading}</div>
        </div>
    );
};

export { SectionHeader };
