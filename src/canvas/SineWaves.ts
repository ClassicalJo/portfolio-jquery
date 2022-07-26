import { RawAnimation, Body } from "./types";
import { Wave } from "./Wave";

export class SineWaves implements RawAnimation {
    ctx: CanvasRenderingContext2D
    w: number;
    h: number;
    hex: string;
    rgb: number[];
    bodies: Body[];
    constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
        this.ctx = ctx
        this.w = width
        this.h = height
        this.hex = "#0d6efd"
        this.rgb = [13, 110, 253]
        let speed = .05
        let freq = .005
        let amp = height / 3
        let waveA = new Wave({ x: 0, y: amp +50 }, width, amp, freq, speed, 1)
        let waveB = new Wave({ x: width, y: height - amp -50 }, width, amp, freq, speed, 1)
        this.bodies = [waveA, waveB]
        this.start()
    }
    start() {
        this.ctx.save()
        this.ctx.fillStyle = "rgba(13,110,253, 1)"
        this.ctx.fillRect(0, 0, this.w, this.h)
        this.ctx.restore()
    }
    clear() {
        this.ctx.save()
        this.ctx.fillStyle = "rgba(13,110,253,.05)"
        this.ctx.fillRect(0, 0, this.w, this.h)
        this.ctx.restore()
    }
    update() {
        this.bodies.forEach(k => k.update())
    }
    draw() {
        this.clear()
        this.bodies.forEach(k => k.render(this.ctx))
    }
}