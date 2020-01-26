import * as componentLibrary from "../components";

const uuidv4 = require("uuid/v4");

// This is not an actual markdown-it plugin :P
// This is just a post-processor on the raw HTML because it's about as
// complicated to write this way as it is to make a real plugin...
// And this way at least we have more control. Or maybe just clearer control.
export default function transformHtml(html) {
    const beginToken = "@{";
    const endToken = "}";

    // Response object
    const response = {
        html: "",
        reactComponents: {},
    };

    // Tokenize the HTML
    let result = "";
    let inLoop = false;
    let component = "";

    for (let i = 0; i < (html || "").length; i++) {
        let c = html.charAt(i);
        let p = i < html.length - 1 ? html.charAt(i + 1) : "";

        if (c + p == beginToken) {
            inLoop = true;
            i++;
            component = "";
        } else if (inLoop && c == endToken) {
            inLoop = false;
            const id = uuidv4();
            response.reactComponents[id] = componentLibrary[component];
            result += `<div id="${id}"></div>`;
            component = "";
        } else if (inLoop) {
            component += c;
        } else {
            result += c;
        }
    }

    response.html = result;
    return response;
}
