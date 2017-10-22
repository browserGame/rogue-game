export type IActionResize = {
  height: number;
  type: 'EVENT_RESIZE';
  width: number;
};

export function actionScreenResize(): IActionResize {
  return {
    height: document.body.clientHeight,
    type: 'EVENT_RESIZE',
    width: document.body.clientWidth
  };
}
