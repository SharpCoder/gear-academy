import React from "react";
import { map } from "lodash";
import { Button } from "@chakra-ui/core";
const ToothCountPicker = ({ context }) => {
    return (
        <div>
            <select></select>
        </div>
    );
};

// {map([16, 18, 24, 26, 28, 30, 32, 34, 36, 38, 60], size => (
//     <option key={`option-${size}`} value={size}>
//         {size}
//     </option>
// ))}

export { ToothCountPicker };
