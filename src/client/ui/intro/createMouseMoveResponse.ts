
import { exp, ln } from '~math';
import { isNumber } from '~utils';


export function createMouseMoveResponse(percentage: number) {
    if (!(percentage > 0 && percentage < 1)) {
      throw new Error(`[percentage] must be in range (0,1) it is: ${percentage}`);
    }

    const alpha = ln(percentage); // Percentage smaller then 1 so alpha is negative (decaying exponent)

    if (!isNumber(alpha)) {
      throw new Error(
        'percentage could not be transferred to [exponent alpha] i.e. ln(percentage)'
      );
    }

    return function response(p: number, p0: number) {
      return Math.sign(p) * (1 - exp(alpha * Math.abs(p) / p0));
    };
  }
