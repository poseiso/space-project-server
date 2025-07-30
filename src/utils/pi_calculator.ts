// Constants
const SCALE_PADDING = 10;
const ARCTAN_TERM_MULTIPLIER = 10;
const ARCTAN_DENOMINATOR_START = 3n;
const ARCTAN_SIGN_START = -1n;
const ARCTAN_LOOP_INCREMENT = 2;
const ARCTAN_X1 = 5n;
const ARCTAN_X2 = 239n;
const PI_MULTIPLIER_ARC1 = 16n;
const PI_MULTIPLIER_ARC2 = 4n;

// Computes arctangent using a power series expansion
function arctanSeries(
  x: bigint,
  unity: bigint,
  digits: number
): { sum: bigint; lastN: number; lastSign: number } {
  let sum = x;
  let sign = ARCTAN_SIGN_START;
  let numerator = x;
  let denominator = ARCTAN_DENOMINATOR_START;
  let iterationCount = 1;

  const termLimit = ARCTAN_TERM_MULTIPLIER * digits;

  for (; iterationCount < termLimit; iterationCount += ARCTAN_LOOP_INCREMENT) {
    numerator = (numerator * x * x) / (unity * unity);
    const term = numerator / denominator;
    sum += sign * term;
    sign *= -1n;
    denominator += 2n;
  }

  return {
    sum,
    lastN: iterationCount - 2,
    lastSign: sign === 1n ? 1 : -1,
  };
}

// Compute π to the given number of digits using Machin's formula
export function computePi(digits: number): { value: string; lastN: number; lastSign: number } {
  const scale = BigInt(digits + SCALE_PADDING);
  const unity = 10n ** scale;

  const arc1 = arctanSeries(unity / ARCTAN_X1, unity, digits);
  const arc2 = arctanSeries(unity / ARCTAN_X2, unity, digits);

  const piApprox = PI_MULTIPLIER_ARC1 * arc1.sum - PI_MULTIPLIER_ARC2 * arc2.sum;
  const scaledPi = (piApprox * 10n ** BigInt(digits)) / unity;
  const piString = scaledPi.toString();

  return {
    value: `${piString[0]}.${piString.slice(1, digits + 1)}`,
    lastN: Math.max(arc1.lastN, arc2.lastN),
    lastSign: arc1.lastSign, // Arbitrary pick; can be arc2 as well
  };
}
