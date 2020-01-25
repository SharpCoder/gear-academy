import Drawable from "../drawable";

export default class ImageDrawable extends Drawable {
    constructor(props) {
        super(props);
        const { src } = props;

        this.loaded = false;
        this.src = src;

        // IMG tag stuff
        this.image = new Image();
        this.image.onload = () => {
            this.loaded = true;
        };

        this.image.src = src;
    }

    onDraw(ctx) {
        if (this.loaded) {
            console.log("drawing");
            const ptrn = ctx.createPattern(this.image, "repeat");
            ctx.fillStyle = ptrn;
            ctx.fillRect(0, 0, this.w, this.h);
        }

        super.onDraw(ctx);
    }
}
