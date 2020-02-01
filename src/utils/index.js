import { get, concat } from "lodash";

export function pathize(title) {
    return (title || "")
        .toLowerCase()
        .replace(/[^a-z0-9 ]/gi, "")
        .split(" ")
        .join("-");
}

/***
 * This function will take all the tutorials and generate
 * an index with the following structure:
 * {
 *     [hash]: <document>
 *     items: Array<{hash: [hash], category: [category]}>
 * }
 */
export function indexTutorials(tutorials) {
    const response = {
        cached: {},
        items: [],
    };
    for (const hashValue in get(tutorials, "default")) {
        let hashText = hashValue;
        // Strip out the convenience number at the start, if applicable.
        // This will facilitate SEO and make it easier to see what the structure
        // looks like while creating content
        if (hashText.indexOf("-") >= 0) {
            if (!isNaN(parseInt(hashText.split("-")[0], 10))) {
                hashText = hashText.substr(hashText.indexOf("-") + 1);
            }
        }

        const hash = `#${hashText}`;
        const tutorial = get(tutorials, ["default", hashValue]);
        const { html, meta } = tutorial;

        // This allows the learningContent to be organized recursively
        // into folders and still come out in the intended structure.
        // Mostly just a convenience for content writing.
        if (meta === undefined && typeof tutorial === "object") {
            const subIndex = indexTutorials({ default: tutorial });
            response.cached = {
                ...response.cached,
                ...subIndex.cached,
            };
            response.items = concat(response.items, subIndex.items);
            continue;
        }

        const { weight, category, title, hidden } = meta;

        if (hidden) continue;

        response.cached[hash] = html;
        response.items.push({
            hash,
            weight,
            category,
            fullPath: concat([""], category || [], title),
        });
    }

    response.items = response.items.sort((a, b) => {
        return a.weight - b.weight;
    });

    return response;
}
