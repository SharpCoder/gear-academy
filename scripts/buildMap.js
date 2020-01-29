"use strict";

/*
    This script will build a navigation map and produce metadata
    about the learning content pages. It should be run anytime something changes.

    To run it: yarn buildMap or npm run buildMap
*/

const _ = require("lodash");
const fs = require("fs");
const md = new (require("markdown-it"))();
const meta = require("markdown-it-meta");

// Configure markdown
md.use(meta);

// Parse the files
const basePath = `${__dirname}/../_learningContent`;
const files = fs.readdirSync(basePath);
const isMarkdown = path => path.indexOf(".md") > 0;
const pathize = title => {
    return (title || "")
        .toLowerCase()
        .replace(/[^a-z0-9 ]/gi, "")
        .split(" ")
        .join("-");
};

const tutorials = [];

for (const file of files) {
    if (isMarkdown(file)) {
        const contents = fs.readFileSync(`${basePath}/${file}`).toString();
        const result = md.render(contents);
        tutorials.push({ meta: { ...md.meta, path: `#${pathize(md.meta.title)}` }, document: result });
    }
}

const hierarchy = _.reduce(
    tutorials,
    (accumulator, tutorial) => {
        const title = _.get(tutorial, "meta.title");
        if (title) {
            const path = _.concat(["root"], _.get(tutorial, "meta.category") || [], [title]);
            _.set(accumulator.navigation, path.join("."), tutorial.meta);
            accumulator.documents[`#${pathize(title)}`] = tutorial.document;
        }

        return accumulator;
    },
    {
        documents: {},
        navigation: {},
    },
);

fs.writeFileSync(`${__dirname}/../dist/lessons.json`, JSON.stringify(hierarchy));
