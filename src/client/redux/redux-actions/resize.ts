export type IResize = {
  height: number;
  type: 'EVENT_RESIZE';
  width: number;
};

export function screenResize(): IResize {
  return {
    height: document.body.clientHeight,
    type: 'EVENT_RESIZE',
    width: document.body.clientWidth
  };
}
