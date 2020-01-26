import { map, remove } from "lodash";

export default class Context {
    constructor() {
        this.listeners = {};
        this.reset();
    }

    reset() {
        this.N = 24;
        this.P = 4;
        this.pa = 14.5;
        this.fireEvent("onGearUpdated");
    }

    setPressureAngle(pa) {
        this.pa = pa;
        this.fireEvent("onGearUpdated");
    }

    setToothCount(N) {
        this.N = N;
        this.fireEvent("onGearUpdated");
    }

    setPitch(number) {
        this.P = number;
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
