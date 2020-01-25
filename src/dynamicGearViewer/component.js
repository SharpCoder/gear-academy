import React, { useEffect, useRef, useState } from "react";
import { get } from "lodash";
import { spurGear } from "./gearUtils";
import { BGFill } from "./constants";
import BGImage from "../assets/batthern.png";

const DynamicGearViewer = ({ context }) => {
    const canvasRef = useRef(null);
    const [screenSize, setScreenSize] = useState();
    const [bgImage, setBgImage] = useState(null);

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

    const img = new Image();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const { width, height } = get(canvas.getClientRects(), "[0]");

        // Make the width/height correctly aligned with the rendered DOM rectangle
        const padding = 10 * 2;
        canvas.width = width - padding;
        canvas.height = height - padding;

        ctx.globalAlpha = 1;
        ctx.fillStyle = BGFill;

        // Create basic fill
        ctx.clearRect(0, 0, width, height);
        ctx.fillRect(0, 0, width, height);

        // Generate a spur gear
        ctx.translate(width / 2, height / 2);

        // Render
        spurGear(ctx, width, height, 24, 4, 14.5);

        if (bgImage) {
            // create pattern
            ctx.translate(-width / 2, -height / 2);
            var ptrn = ctx.createPattern(bgImage, "repeat");
            ctx.fillStyle = ptrn;
            ctx.fillRect(0, 0, width, height);
        }
    }, [canvasRef, screenSize, bgImage]);

    useEffect(() => {
        img.onload = () => {
            setBgImage(img);
        };
        img.src = BGImage;
    }, [canvasRef]);

    return <canvas style={{ flexGrow: 1, padding: 10 }} ref={canvasRef} id="gearViewer" />;
};

export { DynamicGearViewer };
