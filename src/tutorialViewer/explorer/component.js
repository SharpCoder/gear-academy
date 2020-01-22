import React, { useState, useEffect } from "react";
import { map, range, reduce, get } from "lodash";
import { pathize } from "../utils";

const Explorer = ({ tutorials }) => {
    const crumbs = map(tutorials, _ => {
        return get(_, "meta.title");
    });

    const [selected, setSelected] = useState(window.location.hash);

    return (
        <div className="explorer">
            {map(crumbs, tutorialTitle => {
                const href = `#${pathize(tutorialTitle)}`;
                const isSelected = selected === href;

                return (
                    <a
                        key={href}
                        className={isSelected ? "selected" : null}
                        onClick={() => setSelected(href)}
                        href={href}>
                        {tutorialTitle}
                    </a>
                );
            })}
        </div>
    );
};

export { Explorer };
