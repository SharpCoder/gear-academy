import React, { useState } from "react";
import { map, range } from "lodash";
import { BaseComponent } from "./baseComponent";
import Button from "@material-ui/core/Button";

const ResetGearButton = ({ context }) => {
    const handleChange = (_, value) => {
        context.reset();
    };

    return (
        <BaseComponent>
            <Button variant="contained" color="primary" onClick={handleChange}>
                Reset Gear
            </Button>
        </BaseComponent>
    );
};

export { ResetGearButton };
