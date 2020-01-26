import React, { useEffect, useRef, useState } from "react";
import { get } from "lodash";
import { spurGear } from "./gearUtils";
import { BGFill } from "./constants";
import BGImage from "../assets/axiom-pattern.png";
import GameEngine from "./gameEngine";
import ImageDrawable from "./gameEngine/drawables/image";
import Gear from "./gameEngine/drawables/gear";

const DynamicGearViewer = ({ context }) => {
    const canvasRef = useRef(null);
    const [screenSize, setScreenSize] = useState({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });

    useEffect(() => {
        const fn = () => {
            const { current } = canvasRef;
            if (current) {
                current.width = null;
                current.height = null;
            }
            const { innerWidth, innerHeight } = window;
            setScreenSize({ width: innerWidth, height: innerHeight });
        };

        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
        };
    }, []);

    useEffect(() => {
        const canvasWrapper = document.getElementById("canvasWrapper");
        const canvas = canvasRef.current;
        const w = canvasWrapper.clientWidth - 40;
        const h = canvasWrapper.clientHeight - 40;

        const gameEngine = new GameEngine(canvas, w, h);
        const gear = new Gear({
            x: w / 2,
            y: h / 2,
            N: context.N,
            P: context.P,
            pa: context.pa,
        });

        // Add the gear
        gameEngine.getRootEl().addElement(gear);
        context.addEventListener("onGearUpdated", () => {
            gear.setAttributes({
                N: context.N,
                P: context.P,
                pa: context.pa,
            });
        });

        // Add the overlay
        gameEngine.getRootEl().addElement(
            new ImageDrawable({
                src: BGImage,
                w,
                h,
            }),
        );
        return () => {
            gameEngine.destroy();
        };
    }, [canvasRef, screenSize]);

    return (
        <div id="canvasWrapper" style={{ flexGrow: 1, padding: 20 }}>
            <canvas ref={canvasRef} id="gearViewer" />
        </div>
    );
};

export { DynamicGearViewer };
