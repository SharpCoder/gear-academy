import React from "react";

const GearSlider = ({ context }) => {
    return (
        <h1>
            I am a gear slider
            <button
                onClick={() => {
                    context.setPitch(24);
                }}>
                Yes
            </button>
        </h1>
    );
};

export { GearSlider };
