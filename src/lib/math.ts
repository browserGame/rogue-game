
export interface Vector {
    x: number;
    y: number;
}

export function addV(a: Vector, b: Vector): Vector {
    return { x: a.x + b.x, y: a.y + b.y };
}

export function negV(a: Vector): Vector {
    return { x: -a.x, y: -a.y };
}
