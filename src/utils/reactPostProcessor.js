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
        reactComponentProps: {},
    };

    // Tokenize the HTML
    let result = "";
    let inLoop = false;
    let component = "";

    let loadStack = false;
    let stackId = null;
    let _html = "";

    for (let i = 0; i < (html || "").length; i++) {
        let c = html.charAt(i);
        let p = i < html.length - 1 ? html.charAt(i + 1) : "";

        if (c + p == beginToken) {
            inLoop = true;
            i++;
            component = "";
        } else if (inLoop && c == endToken) {
            inLoop = false;

            // Special directive, 'if'
            // NOTE: TODO: this should probably be a more grammatically-based
            // parser instead of awful if statements. Next time you add something here
            // please refactor.
            const id = uuidv4();

            if (component.indexOf(" ") >= 0) {
                const components = component.split(" ");
                const condition = component.substr(component.indexOf(" ") + 1);
                component = components[0];

                if (component === "If") {
                    stackId = id;
                    loadStack = true;
                    response.reactComponentProps[id] = {
                        _html: "",
                        condition,
                    };
                }
            } else if (component === "EndIf") {
                loadStack = false;
                response.reactComponentProps[stackId]._html = _html;
                _html = "";
                component = "";
                inLoop = false;
                stackId = null;
                continue;
            }

            response.reactComponents[id] = componentLibrary[component];
            result += `<div id="${id}"></div>`;
            component = "";
        } else if (inLoop) {
            component += c;
        } else if (loadStack) {
            _html += c;
        } else {
            result += c;
        }
    }

    response.html = result;
    return response;
}
