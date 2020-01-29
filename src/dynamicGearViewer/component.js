import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import BGImage from "../assets/axiom-pattern.png";
import GameEngine from "./gameEngine";
import ImageDrawable from "./gameEngine/drawables/image";
import Gear from "./gameEngine/drawables/gear";

const DynamicGearViewer = ({ context }) => {
    const canvasRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [screenSize, setScreenSize] = useState({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });

    useEffect(() => {
        const isNotScrolling = debounce(
            () => {
                setIsScrolling(false);
            },
            250,
            { trailing: true },
        );

        const fn = () => {
            setIsScrolling(true);
            isNotScrolling(); // debounced

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
        if (!isScrolling) {
            const canvasWrapper = document.getElementById("canvasWrapper");
            const canvas = canvasRef.current;
            const w = canvasWrapper.clientWidth;
            const h = Math.max(canvasWrapper.clientHeight, 500);

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
        }
    }, [canvasRef, screenSize, isScrolling]);

    return (
        <div id="canvasWrapper" style={{ flexGrow: 1, position: "fixed", width: "50%", height: "100%" }}>
            {isScrolling ? (
                <div style={{ width: "100%", flexGrow: 1 }}>
                    <h1 style={{ textAlign: "center" }}>Scrolling</h1>
                </div>
            ) : (
                <canvas ref={canvasRef} id="gearViewer" />
            )}
        </div>
    );
};

export { DynamicGearViewer };
