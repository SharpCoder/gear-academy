import { map } from "lodash";

export default class Context {
    constructor() {
        this.listeners = {};
        this.N = 24;
        this.P = 4;
        this.pa = 14.5;
    }

    setPitch(number) {
        this.pitch = number;
        this.fireEvent("onGearUpdated");
    }

    addEventListener(event, cb) {
        this.listeners[event] = this.listeners[event] || [];
        cb && this.listeners[event].push(cb);
    }

    fireEvent(event, args) {
        this.listeners[event] &&
            map(this.listeners[event], method => {
                method(args);
            });
    }
}
