import Drawable from "./drawable";
import { BGFill } from "../constants";

export default class GameEngine {
    constructor(canvas, w, h) {
        this.w = w;
        this.h = h;

        canvas.width = w;
        canvas.height = h;

        this.timeStarted = new Date().getTime();
        this.ctx = canvas.getContext("2d");
        this.timerId = setInterval(this.handleTick.bind(this), 15);
        this.rootEl = new Drawable({});
    }

    getRootEl() {
        return this.rootEl;
    }

    handleTick() {
        const time = new Date().getTime() - this.timeStarted;
        const gameEngine = this;
        this.rootEl.onUpdate(gameEngine, time);

        this.ctx.save();
        this.ctx.fillStyle = BGFill;
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.ctx.fillRect(0, 0, this.w, this.h);

        this.rootEl.onDraw(this.ctx);
        this.ctx.restore();
    }

    destroy() {
        clearInterval(this.timerId);
    }
}
