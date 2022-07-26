export interface RawAnimation {
    update: () => void;
    draw: () => void;
}
export type Vector = { x: number; y: number }

export interface Body {
    p: Vector;
    update: () => void;
    render: (ctx: CanvasRenderingContext2D) => void;
}