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
    rotation: number;
    reverse: boolean;
    constructor(origin: Vector, width: number, amplitude: number, frequency: number, speed: number, direction: number) {
        this.origin = origin
        this.p = { ...origin };
        this.w = width;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.speed = speed
        this.direction = direction
        this.progress = 0
        this.size = 10 * speed
        this.rotation = 0
        this.reverse = false
    }
    wing(ctx: CanvasRenderingContext2D, start: number, span: number) {
        ctx.save()
        ctx.beginPath()
        let r = 1000
        let initialAngle = start + this.rotation
        let x1 = Math.cos(initialAngle)
        let y1 = Math.sin(initialAngle)
        ctx.fillStyle = "rgba(255,255,255,0.025)"
        ctx.moveTo(this.p.x, this.p.y)
        ctx.lineTo(this.p.x + r * x1, this.p.y + r * y1)
        ctx.arc(this.p.x, this.p.y, r, initialAngle, initialAngle + span)
        ctx.lineTo(this.p.x, this.p.y)
        ctx.fill()
        ctx.restore()
    }
    render(ctx: CanvasRenderingContext2D) {
        let d = Math.PI * 2
        let span = Math.PI / 10
        let angle = Math.PI / 2
        
        for (let i = 0; i < d; i++) {
            this.wing(ctx, angle * i, span)
        }
        
    }

    update() {
        this.rotation += Math.PI / 180
        this.progress += this.reverse ? -1 : 1
        this.p.x = this.p.x + (this.w / 100) * this.speed * (this.reverse ? -1 : 1)
        this.p.y = this.origin.y + (this.amplitude * Math.sin(this.progress * this.frequency) * this.direction)
        if (this.p.x > this.w) this.reverse = true
        if (this.p.x < 0) this.reverse = false
    }
}