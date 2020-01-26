import React, { useState, useEffect } from "react";
import { map } from "lodash";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const ToothCountPicker = ({ context }) => {
    const [selected, setSelected] = useState(24);

    const handleChange = event => {
        const { value } = event.target;
        context.setToothCount(value);
        setSelected(value);
    };

    return (
        <div className="injected-control">
            <InputLabel shrink>Tooth Count</InputLabel>
            <Select onChange={handleChange} value={selected}>
                {map([16, 18, 24, 26, 28, 30, 32, 34, 36, 38, 60], size => (
                    <MenuItem key={`${size}-teeth`} value={size}>
                        {size} Teeth
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};

export { ToothCountPicker };
