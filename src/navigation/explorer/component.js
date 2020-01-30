import React from "react";
import { keys, map, set, reduce } from "lodash";
import "./explorer.css";

const Crumbs = ({ nodes, setSelectedTutorial, depth }) => {
    return map(keys(nodes), node => {
        const entry = nodes[node];

        if (typeof entry === "object") {
            return (
                <div key={`crumb-section-${node}`} className="crumb-header">
                    <div style={{ marginLeft: (depth + 1) * 10 }}>{node}</div>
                    <Crumbs nodes={entry} depth={depth + 1} setSelectedTutorial={setSelectedTutorial} />
                </div>
            );
        } else {
            const isSelected = entry === window.location.hash;
            return (
                <div
                    key={`crumb-content-${node}`}
                    className={isSelected ? "selected crumb-node" : "crumb-node"}
                    onClick={() => setSelectedTutorial(entry)}>
                    {node}
                </div>
            );
        }
    });
};

const Explorer = ({ tutorials }) => {
    const hierarchy = reduce(
        tutorials.items,
        (accumulator, tutorial) => {
            set(accumulator, tutorial.fullPath.join("."), tutorial.hash);
            return accumulator;
        },
        {},
    );

    return (
        <div className="explorer">
            <Crumbs depth={0} nodes={hierarchy} setSelectedTutorial={hash => (window.location.hash = hash)} />
        </div>
    );
};

export { Explorer };
