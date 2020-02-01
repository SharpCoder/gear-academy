import React, { useState, useEffect } from "react";
import { map, range } from "lodash";
import { BaseComponent } from "./baseComponent";
import Button from "@material-ui/core/Button";

const ResetOnLoad = ({ context }) => {
    context.reset();

    return <React.Fragment />;
};

export { ResetOnLoad };
