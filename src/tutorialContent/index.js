import React from "react";
import Pitch from "./views/pitch";

const crumb = (title, children) => {
    return {
        type: "crumb",
        title,
        children,
    };
};

const view = component => {
    return {
        type: "view",
        component,
    };
};

// TODO: something slightly less horribly formatted.
export default crumb("Gear Tutorials", [
    crumb("Spur Gears", [crumb("Pitch", view(Pitch)), crumb("Pressure Angle", null), crumb("Parameters", null)]),
    crumb("Involute Curve"),
]);
