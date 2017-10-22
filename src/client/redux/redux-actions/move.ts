export type IActionMove = {
  type: 'EVENT_MOVE';
  x: number;
  y: number;
};

export function actionMouseMove(x: number, y: number): IActionMove {
  return {
    type: 'EVENT_MOVE',
    x,
    y
  };
}
