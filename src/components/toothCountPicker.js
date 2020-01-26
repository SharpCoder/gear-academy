import React from "react";
import { map } from "lodash";

const ToothCountPicker = ({ context }) => {
    const handleChange = event => {
        const { value } = event.target;
        context.setToothCount(value);
    };
    return (
        <div>
            <select onChange={handleChange}>
                {map([16, 18, 24, 26, 28, 30, 32, 34, 36, 38, 60], size => (
                    <option key={`option-${size}`} value={size}>
                        {size}
                    </option>
                ))}
            </select>
        </div>
    );
};

export { ToothCountPicker };
