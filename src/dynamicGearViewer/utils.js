import { range, map, concat, reverse } from "lodash";

/* Constants */
const PI = Math.PI;
const in_to_mm = 25.4;
const in_to_px = 25.4;
const deg_to_rad = PI / 180;
const rad_to_deg = 180 / PI;

/* Math Functions */
function parametric_points({ fx, fy, t0, t1, delta } = props) {
    return map(range(t0, t1, delta), t => [fx(t), fy(t)]);
}

function calc_module(P) {
    return in_to_px / P;
}

function calc_addendum(P) {
    return (1 / P) * in_to_px;
}

function calc_dedendum(P) {
    return (1.25 / P) * in_to_px;
}

function calc_dp(N, P) {
    return (N / P) * in_to_px;
}

function calc_db(N, P, pa) {
    return calc_dp(N, P) * Math.cos(pa * deg_to_rad);
}

function calc_dr(N, P) {
    return calc_dp(N, P) - 2 * calc_dedendum(P);
}

function calc_circular_pitch(P) {
    return (PI / P) * in_to_px;
}

function calc_alpha(dp, db, pa) {
    return Math.sqrt(Math.pow(dp, 2) - Math.pow(db, 2)) / db - pa * deg_to_rad;
}

function calc_clearance(P) {
    return calc_dedendum(P) - calc_addendum(P);
}

function calc_center_distance(N1, N2, P) {
    return (in_to_mm * (N1 + N2)) / (2 * P);
}

/* Drawing Functions */
function circular_mirror(ctx, d, count) {
    // Curry
    return function(drawMethod) {
        const aps = 360.0 / count;
        map(range(1, count + 1), step => {
            const currentAngle = step * aps;
            const unitX = Math.cos(currentAngle * deg_to_rad);
            const unitY = Math.sin(currentAngle * deg_to_rad);
            ctx.save();
            ctx.translate(unitX * d, unitY * d);
            ctx.rotate(currentAngle * deg_to_rad);
            drawMethod();
            ctx.restore();
        });
    };
}

function drawPolygon(ctx, points) {
    ctx.beginPath();
    map(points, point => {
        ctx.lineTo(point[0], point[1]);
    });
    ctx.closePath();
    ctx.fill();
}

function drawCircle(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fill();
}

function drawInvoluteTooth(ctx, r, beta) {
    const x = t => r * (Math.cos(t) + t * Math.sin(t));
    const y = t => r * (Math.sin(t) - t * Math.cos(t));
    const x2 = t => r * (Math.cos(-t - beta) - t * Math.sin(-t - beta));
    const y2 = t => r * (Math.sin(-t - beta) + t * Math.cos(-t - beta));

    const involute_1_points = parametric_points({ fx: x, fy: y, t0: 0, t1: 0.68, delta: 0.01 });
    const involute_2_points = parametric_points({ fx: x2, fy: y2, t0: 0, t1: 0.68, delta: 0.01 });

    drawPolygon(ctx, concat([[0, 0]], involute_1_points, reverse(involute_2_points), [[0, 0]]));
}

/* Exported Functions */
export function computeGearAttributes(N, P, pa) {
    const baseAttr = {
        dp: calc_dp(N, P),
        db: calc_db(N, P, pa),
        a: calc_addendum(P),
        b: calc_dedendum(P),
        p: calc_circular_pitch(P),
    };

    const formulaAttr = {
        alpha: calc_alpha(baseAttr.dp, baseAttr.db, pa),
    };

    const calculatedAttr = {
        beta: (360.0 / (4.0 * N) - formulaAttr.alpha) * 2 * deg_to_rad,
    };

    return {
        ...baseAttr,
        ...formulaAttr,
        ...calculatedAttr,
    };
}

export function spurGear(ctx, width, height, N, P, pa) {
    ctx.save();

    const { db, dp, a, b, p, alpha, beta } = computeGearAttributes(N, P, pa);

    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#000";

    drawCircle(ctx, dp + 2 * a);

    ctx.fillStyle = "#0077ff";
    circular_mirror(
        ctx,
        0,
        N,
    )(() => {
        drawInvoluteTooth(ctx, db, beta);
    });

    ctx.fillStyle = "#000";
    drawCircle(ctx, dp - 2 * b);
    ctx.restore();
}
