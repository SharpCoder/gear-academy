import React, { useState, useEffect } from "react";
import { map, range } from "lodash";
import { BaseComponent } from "./baseComponent";
import Slider from "@material-ui/core/Slider";

const PressureAngleComponent = ({ context }) => {
    const [pa, setPa] = useState(context.pa);
    const marks = map([14.5, 16, 17, 18, 19, 20, 21, 22, 25, 30], pitch => {
        return {
            value: pitch,
            label: `${pitch}`,
        };
    });

    const handleChange = (_, value) => {
        context.setPressureAngle(value);
    };

    useEffect(() => {
        const fn = () => {
            if (context.pa !== pa) {
                setPa(context.pa);
            }
        };

        context.addEventListener("onGearUpdated", fn);
        return () => {
            context.removeEventListener("onGearUpdated", fn);
        };
    }, [pa]);
    return (
        <BaseComponent>
            <Slider
                onChange={handleChange}
                value={pa}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={0.5}
                marks={marks}
                min={10}
                max={30}
            />
        </BaseComponent>
    );
};

export { PressureAngleComponent };
