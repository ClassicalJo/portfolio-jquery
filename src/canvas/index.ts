import { CanvasAnimation } from './CanvasAnimation'
import { SineWaves } from './SineWaves'
let canvas = document.querySelector("#canvas") as HTMLCanvasElement
let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
let sine = new SineWaves(ctx, canvas.width, canvas.height)
let animation = new CanvasAnimation(canvas, sine)
export default animation