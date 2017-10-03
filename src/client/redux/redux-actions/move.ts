export type IMove = {
  type: 'EVENT_MOVE';
  x: number;
  y: number;
};

export function mouseMove(x: number, y: number): IMove {
  return {
    type: 'EVENT_MOVE',
    x,
    y
  };
}
