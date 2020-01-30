import { get, findIndex } from "lodash";
import React, { useState, useEffect } from "react";
import "./pageNavigator.css";

const hashIndexFilter = item => {
    return item.hash === window.location.hash;
};

const PageNavigator = ({ currentTutorial, items }) => {
    const [index, setIndex] = useState(findIndex(items, hashIndexFilter));

    useEffect(() => {
        setIndex(findIndex(items, hashIndexFilter));
    }, [currentTutorial, items]);

    const setPageByIndex = index => {
        window.location.hash = get(items[index], "hash");
    };

    return (
        <div className="page-navigator">
            <button
                disabled={index <= 0}
                onClick={() => {
                    setPageByIndex(index - 1);
                }}>
                {" "}
                &lt;{" "}
            </button>
            <span>{index + 1}</span>
            <span>/</span>
            <span>{items.length}</span>
            <button
                disabled={index >= items.length - 1}
                onClick={() => {
                    setPageByIndex(index + 1);
                }}>
                {" "}
                &gt;{" "}
            </button>
        </div>
    );
};

export { PageNavigator };
