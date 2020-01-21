import React, { useRef, useEffect } from "react";
import { map, range } from "lodash";

const spaces = depth => {
    return map(range(0, depth), () => "-").join("");
};

const Explorer = ({ crumb, depth = 0 }) => {
    const { children, title } = crumb || {};

    return (
        <div>
            <b>{title && spaces(depth) + title}</b>
            {map(children, child => {
                return (
                    <div>
                        <Explorer crumb={child} depth={depth + 1} />
                    </div>
                );
            })}
        </div>
    );
};

export { Explorer };
