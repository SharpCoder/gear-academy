import React from "react";
import { map, get } from "lodash";
import { pathize } from "../utils";

const Explorer = ({ tutorials, setSelectedTutorial, selected }) => {
    const crumbs = map(tutorials, _ => {
        return get(_, "meta.title");
    });

    return (
        <div className="explorer">
            {map(crumbs, tutorialTitle => {
                const href = `#${pathize(tutorialTitle)}`;
                const isSelected = selected === href;

                return (
                    tutorialTitle && (
                        <div
                            key={href}
                            className={isSelected ? "selected" : null}
                            onClick={() => setSelectedTutorial(href)}
                            href={href}>
                            {tutorialTitle}
                        </div>
                    )
                );
            })}
        </div>
    );
};

export { Explorer };
