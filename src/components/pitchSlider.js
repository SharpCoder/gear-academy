import React, { useState, useEffect } from "react";
import { map, range } from "lodash";
import { BaseComponent } from "./baseComponent";
import Slider from "@material-ui/core/Slider";

const marks = map(range(1, 10), pitch => {
    return {
        value: pitch,
        label: `${pitch}"`,
    };
});

function valuetext(value) {
    return `${value} inches`;
}

const PitchSlider = ({ context }) => {
    const [pitch, setPitch] = useState(context.P);

    const handleChange = (_, value) => {
        context.setPitch(value);
    };

    useEffect(() => {
        const fn = () => {
            if (context.P !== pitch) {
                setPitch(context.P);
            }
        };

        context.addEventListener("onGearUpdated", fn);
        return () => {
            context.removeEventListener("onGearUpdated", fn);
        };
    }, [pitch]);

    return (
        <BaseComponent>
            <Slider
                onChange={handleChange}
                value={pitch}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
            />
        </BaseComponent>
    );
};

export { PitchSlider };
