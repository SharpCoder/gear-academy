export function pathize(title) {
    return (title || "")
        .toLowerCase()
        .replace(/[^a-z0-9 ]/gi, "")
        .split(" ")
        .join("-");
}
