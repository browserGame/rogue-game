import * as React from 'react';


function isSynthetic(e: any): e is (React.SyntheticEvent<any>) {
    return e.persist && e.persist instanceof Function;
}

export function debounce(
  fn: (e: React.SyntheticEvent<any> | UIEvent) => void
) {
  const parkedEvent: (React.SyntheticEvent<any> | UIEvent)[] = [];

  function animate(_time: number) {
    const e = parkedEvent.pop();
    if (e) {
      fn(e);
      requestAnimationFrame(animate);
    }
  }

  return function wrap(e: React.SyntheticEvent<any> | UIEvent) {
    if (isSynthetic(e)) e.persist();
    if (parkedEvent.length) {
      return (parkedEvent[0] = e || parkedEvent[0]);
    }
    parkedEvent.push(e);
    requestAnimationFrame(animate);
  };
}

export function debounceNativeEvent<T extends UIEvent>(fn: (e: T) => void) {
  const parkedEvent: T[] = [];

  function animate(_time: number) {
    const e = parkedEvent.pop();
    if (e) {
      fn(e);
      requestAnimationFrame(animate);
    }
  }

  return function wrap(e: T) {
    if (parkedEvent.length) {
      return (parkedEvent[0] = e || parkedEvent[0]);
    }
    parkedEvent.push(e);
    requestAnimationFrame(animate);
  };
}
