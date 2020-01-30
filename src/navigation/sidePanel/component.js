import React from "react";
import "./sidePanel.css";

const SidePanel = ({ open, children }) => {
    const classes = ["side-panel"];
    if (open === true) {
        classes.push("open");
    } else if (open === false) {
        classes.push("close");
    }

    return (
        <div className={"side-panel-wrapper"}>
            <div className={classes.join(" ")}>{children}</div>
        </div>
    );
};

export { SidePanel };
