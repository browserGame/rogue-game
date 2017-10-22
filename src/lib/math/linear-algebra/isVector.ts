import { IVector } from '~math';

export function isVector(v: any): v is IVector {
  return (
    v &&
    typeof v.x === 'number' &&
    typeof v.y === 'number' &&
    (v.z && typeof v.z === 'number' || true)
  );
}
