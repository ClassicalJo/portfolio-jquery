import { Body, Vector } from './types'
export class Wave implements Body {
    origin: Vector;
    p: Vector;
    w: number;
    amplitude: number;
    frequency: number;
    progress: number;
    direction: number;
    speed: number;
    size: number;
    lifetime: number;
    delay: number;
    rotation: number;
    reverse: boolean;
    constructor(origin: Vector, width: number, amplitude: number, frequency: number, speed: number, direction: number, delay: number) {
        this.origin = origin
        this.p = { ...origin };
        this.w = width;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.speed = speed
        this.direction = direction
        this.progress = 0
        this.lifetime = 0
        this.size = 10 * speed
        this.delay = delay
        this.rotation = 0
        this.reverse = false
    }
    wing(ctx: CanvasRenderingContext2D, start: number, span: number) {
        ctx.save()
        ctx.beginPath()
        let r = 1000
        ctx.fillStyle = "rgba(255,255,255,0.05)"
        ctx.moveTo(this.p.x, this.p.y)
        ctx.lineTo(this.p.x + r * Math.cos(start + this.rotation), this.p.y + r * Math.sin(start + this.rotation))
        ctx.arc(this.p.x, this.p.y, r, start + this.rotation, start + span + this.rotation)
        ctx.lineTo(this.p.x, this.p.y)
        ctx.fill()
        ctx.restore()
    }
    render(ctx: CanvasRenderingContext2D) {
        if (this.lifetime < this.delay) return
        let r = 5
        let d = Math.PI * 2
        ctx.save()
        this.wing(ctx, Math.PI / 2, Math.PI / 10)
        this.wing(ctx, Math.PI, Math.PI / 10)
        this.wing(ctx, Math.PI * 3 / 2, Math.PI / 10)
        this.wing(ctx, Math.PI * 2, Math.PI / 10)
        ctx.beginPath()
        ctx.fillStyle = "white"
        ctx.arc(this.p.x, this.p.y, r, 0, d)
        ctx.fill()
        ctx.restore()
    }

    update() {
        this.lifetime++
        this.rotation += Math.PI / 180
        if (this.lifetime < this.delay) return
        this.progress += this.reverse ? -1 : 1
        this.p.x += (this.w / 100) * this.speed * (this.reverse ? -1 : 1)
        this.p.y = this.origin.y + (this.amplitude * Math.sin(this.progress * this.frequency) * this.direction)
        if (this.p.x > this.w) {
            this.reverse = true
        }
        if (this.p.x < 0) {
            this.reverse = false
        }
    }
}