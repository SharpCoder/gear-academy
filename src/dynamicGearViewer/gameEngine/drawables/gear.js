import Drawable from "../drawable";
import { spurGear } from "../../gearUtils";

const deg_to_rad = Math.PI / 180;

export default class Gear extends Drawable {
    constructor(props) {
        super(props);

        const { N, P, pa, rpm, visible } = props;
        this.N = N || 24;
        this.P = P || 4;
        this.pa = pa || 14.5;
        this.rpm = rpm;
        this.visible = visible;
    }

    onUpdate(gameEngine, time) {
        const RPM = this.rpm;
        const secondsElapsed = time / 1000;
        const angle = (secondsElapsed % 60) * 6 * RPM;
        this.rotation = angle;
    }

    onDraw(ctx) {
        if (!this.visible) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * deg_to_rad);
        spurGear(ctx, this.N, this.P, this.pa);
        ctx.restore();
    }
}
