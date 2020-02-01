import React, { useState, useEffect } from "react";
import { map } from "lodash";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { BaseComponent } from "./baseComponent";

const ToothCountPicker = ({ context }) => {
    const [selected, setSelected] = useState(context.N);

    const handleChange = event => {
        const { value } = event.target;
        context.setToothCount(value);
    };

    useEffect(() => {
        const fn = () => {
            if (context.N !== selected) {
                setSelected(context.N);
            }
        };

        context.addEventListener("onGearUpdated", fn);
        return () => {
            context.removeEventListener("onGearUpdated", fn);
        };
    });

    return (
        <BaseComponent>
            <InputLabel shrink>Tooth Count</InputLabel>
            <Select onChange={handleChange} value={selected}>
                {map([18, 24, 26, 28, 30, 32, 34, 36, 38, 60], size => (
                    <MenuItem key={`${size}-teeth`} value={size}>
                        {size} Teeth
                    </MenuItem>
                ))}
            </Select>
        </BaseComponent>
    );
};

export { ToothCountPicker };
