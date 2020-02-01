import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import BGImage from "../assets/axiom-pattern.png";
import GameEngine from "./gameEngine";
import ImageDrawable from "./gameEngine/drawables/image";
import Gear from "./gameEngine/drawables/gear";
import { calc_center_distance, calc_full_size } from "./gearUtils";

const DynamicGearViewer = ({ context }) => {
    const canvasRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [screenSize, setScreenSize] = useState({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });

    const calculateDistance = N2 => {
        return calc_full_size(context.N, context.P, context.pa) + calc_full_size(N2, context.P, context.pa);
        // return calc_center_distance(context.N, N2, context.P) * 2 + calc_dr(context.N, context.P) / 2;
    };

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
                rpm: context.rpm,
            });

            const drivenGear = new Gear({
                x: w / 2,
                y: h / 2 - calculateDistance(context.N / 2),
                N: context.N / 2,
                P: context.P,
                pa: context.pa,
                rpm: context.rpm * -2,
                visible: context.showDrivenGear,
            });

            // Add the gear
            gameEngine.getRootEl().addElement(gear);
            gameEngine.getRootEl().addElement(drivenGear);
            context.addEventListener("onGearUpdated", () => {
                gear.setAttributes({
                    N: context.N,
                    P: context.P,
                    pa: context.pa,
                });

                drivenGear.setAttributes({
                    x: w / 2,
                    y: h / 2 - calculateDistance(context.N / 2),
                    N: context.N / 2,
                    P: context.P,
                    pa: context.pa,
                    rpm: context.rpm * -2,
                    visible: context.showDrivenGear,
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
