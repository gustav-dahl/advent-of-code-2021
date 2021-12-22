import {
  chain,
  curry,
  max,
  min,
  minBy,
  range,
} from 'lodash';

const log = console.log;

const median = (arr): number => {
  const middle = Math.floor(arr.length / 2);
  arr = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0
    ? arr[middle]
    : (arr[middle - 1] + arr[middle]) / 2;
};

export const run = (
  input: string,
): {
  part1: () => number;
  part2: () => number;
} => {
  const positions = input.split(',').map((x) => parseInt(x));

  // --------------------------------------------------------------------------
  // Part 1
  // --------------------------------------------------------------------------
  const part1 = () => {
    const target = median(positions);
    //log(target);

    const cost = curry((target: number, position: number) =>
      Math.abs(target - position),
    );

    const result = chain(positions).map(cost(target)).sum().value();

    log(result);

    return result;
  };

  // --------------------------------------------------------------------------
  // Part 2
  // --------------------------------------------------------------------------
  const part2 = () => {
    const cost = curry((target: number, position: number) => {
      const n = Math.abs(target - position);
      return (n * (n + 1)) / 2;
    });

    const targetCosts = range(min(positions), max(positions))
    .map((target) => {
      return {
        target,
        cost: chain(positions).map(cost(target)).sum().value(),
      };
    });

    log(targetCosts);

    const target = minBy(targetCosts, (x) => x.cost);
    log(target);

    return target.cost;
  };

  return { part1, part2 };
};
