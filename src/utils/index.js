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

    for (const hashText in get(tutorials, "default")) {
        const hash = `#${hashText}`;
        const { html, meta } = get(tutorials, ["default", hashText]);
        const { weight, category, title } = meta;

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
