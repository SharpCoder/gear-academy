import React, { useEffect, useRef, useState } from "react";
import { get } from "lodash";
import { spurGear } from "./utils";

const DynamicGearViewer = ({ context }) => {
    const canvasRef = useRef(null);
    const [screenSize, setScreenSize] = useState();

    useEffect(() => {
        const fn = () => {
            const { innerWidth, innerHeight } = window;
            setScreenSize({ width: innerWidth, height: innerHeight });
        };

        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const { width, height } = get(canvas.getClientRects(), "[0]");

        // Make the width/height correctly aligned with the rendered DOM rectangle
        const padding = 10 * 2;
        canvas.width = width - padding;
        canvas.height = height - padding;

        ctx.globalAlpha = 1;
        ctx.fillStyle = "#0077ff";

        // Create basic fill
        ctx.clearRect(0, 0, width, height);
        ctx.fillRect(0, 0, width, height);

        // Generate a spur gear
        ctx.translate(width / 2, height / 2);
        spurGear(ctx, width, height, 18, 6, 20);
    }, [canvasRef, screenSize]);

    return <canvas style={{ flexGrow: 1, padding: 10 }} ref={canvasRef} id="gearViewer" />;
};

export { DynamicGearViewer };
