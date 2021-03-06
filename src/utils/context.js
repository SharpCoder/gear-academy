import { map, remove, debounce } from "lodash";
import { computeGearAttributes } from "../dynamicGearViewer/gearUtils";

export default class Context {
    constructor() {
        this.listeners = {};
        this.reset();
    }

    recalc() {
        const attributes = computeGearAttributes(this.N, this.P, this.pa);
        for (const prop in attributes) {
            this[prop] = attributes[prop];
        }
    }

    reset() {
        this.N = 24;
        this.P = 4;
        this.pa = 14.5;
        this.rpm = 2;
        this.showDrivenGear = false;
        this.recalc();
        this.fireEvent("onGearUpdated");
    }

    setPressureAngle(pa) {
        this.pa = pa;
        this.recalc();
        this.fireEvent("onGearUpdated");
    }

    setToothCount(N) {
        this.N = N;
        this.recalc();
        this.fireEvent("onGearUpdated");
    }

    setPitch(number) {
        this.P = number;
        this.recalc();
        this.fireEvent("onGearUpdated");
    }

    setDrivenGearVisibility(vis) {
        this.showDrivenGear = vis;
        this.recalc();
        this.fireEvent("onGearUpdated");
    }

    addEventListener(event, cb) {
        this.listeners[event] = this.listeners[event] || [];
        cb && this.listeners[event].push(cb);
    }

    removeEventListener(event, cb) {
        const events = this.listeners[event] || [];
        remove(events, _ => _ === cb);
    }

    fireEvent(event, args) {
        this.listeners[event] &&
            map(this.listeners[event], method => {
                method(args);
            });
    }
}
