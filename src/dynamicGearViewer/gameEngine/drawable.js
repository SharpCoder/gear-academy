export default class Drawable {
    constructor({ x, y, vx, vy, w, h, rotation, children } = props) {
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 0;
        this.h = h || 0;
        this.rotation = rotation || 0;
        this.vx = vx || 0;
        this.vy = vy || 0;
        this.children = children || [];
    }

    setAttributes(attributes) {
        for (const attribute in attributes) {
            this[attribute] = attributes[attribute];
        }
    }

    addElement(child) {
        this.children.push(child);
    }

    onUpdate(engine, time) {
        // Basic vector math
        this.x += this.vx;
        this.y += this.vy;

        // Basic recursive updating
        for (const child of this.children) {
            if (child && child.onUpdate && typeof child.onUpdate === "function") {
                child.onUpdate(engine, time);
            }
        }
    }

    onDraw(ctx) {
        // Basic recursive rendering
        for (const child of this.children) {
            if (child && child.onDraw && typeof child.onDraw === "function") {
                child.onDraw(ctx);
            }
        }
    }
}
