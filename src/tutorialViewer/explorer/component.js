import React from "react";
import { keys, map, get, set, concat, reduce } from "lodash";
import { pathize } from "../../utils";

const Crumbs = ({ hierarchy, depth, selected, setSelectedTutorial }) => {
    const hierarchies = keys(hierarchy);
    hierarchies.sort((a, b) => {
        const aWeight = get(hierarchy[a], "meta.weight") || 0;
        const bWeight = get(hierarchy[b], "meta.weight") || 0;

        // This is an ugly hack but...
        if (b === "Additional") {
            return -100;
        } else {
            return bWeight - aWeight;
        }
    });

    return map(hierarchies, title => {
        const entry = hierarchy[title] || {};
        if (entry.meta) {
            const href = `#${pathize(title)}`;
            const isSelected = selected === href;

            // This is a leaf node, implicitly
            return (
                <div
                    key={href}
                    className={isSelected ? "selected crumb-node" : "crumb-node"}
                    onClick={() => setSelectedTutorial(href)}
                    href={href}>
                    {get(entry, "meta.title")}
                </div>
            );
        } else {
            return (
                <div key={`crumb-${title}`} className="crumb-header">
                    <div style={{ marginLeft: (depth + 1) * 10 }}>{title}</div>
                    <Crumbs
                        hierarchy={entry}
                        depth={depth + 1}
                        selected={selected}
                        setSelectedTutorial={setSelectedTutorial}
                    />
                </div>
            );
        }
    });
};

const Explorer = ({ tutorials, setSelectedTutorial, selected }) => {
    const hierarchy = reduce(
        tutorials,
        (accumulator, tutorial) => {
            const title = get(tutorial, "meta.title");
            if (title) {
                const path = concat(["Gears"], get(tutorial, "meta.category") || [], [title]);
                set(accumulator, path.join("."), tutorial);
            }
            return accumulator;
        },
        {},
    );

    return (
        <div className="explorer">
            <Crumbs hierarchy={hierarchy} depth={0} selected={selected} setSelectedTutorial={setSelectedTutorial} />
        </div>
    );
};

export { Explorer };
