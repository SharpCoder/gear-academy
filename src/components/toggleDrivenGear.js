import React, { useState, useEffect } from "react";
import { BaseComponent } from "./baseComponent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const ToggleDrivenGear = ({ context }) => {
    const [visible, setVisible] = useState(context.showDrivenGear);

    const handleChange = event => {
        const isVisible = event.target.checked;
        context.setDrivenGearVisibility(isVisible);
        setVisible(isVisible);
    };

    useEffect(() => {
        const fn = () => {
            if (context.showDrivenGear !== visible) {
                setVisible(context.showDrivenGear);
            }
        };

        context.addEventListener("onGearUpdated", fn);
        return () => {
            context.removeEventListener("onGearUpdated", fn);
        };
    });

    return (
        <BaseComponent>
            <FormControlLabel control={<Switch checked={visible} onChange={handleChange} />} label="Show Driven Gear" />
        </BaseComponent>
    );
};

export { ToggleDrivenGear };
