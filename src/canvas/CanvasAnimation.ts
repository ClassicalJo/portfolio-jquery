import { RawAnimation } from "./types";
export class CanvasAnimation {
    canvas: HTMLCanvasElement;
    shouldStop: boolean;
    animation: RawAnimation
    constructor(canvas: HTMLCanvasElement, animation: RawAnimation) {
        this.canvas = canvas
        this.shouldStop = true
        this.animation = animation;
    }
    
    loop() {
        this.animation.update()
        this.animation.draw()
        if (!this.shouldStop) requestAnimationFrame(() => this.loop())
    }
    play() {
        this.shouldStop = false
        this.loop()
    }
    stop() {
        this.shouldStop = true
    }
}