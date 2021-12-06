import { chain, range, reduce, countBy } from 'lodash';

const log = console.log;

export const run = (
  input: string,
): {
  part1: (days: number) => number;
  part2: (days: number) => number;
} => {
  const fish = chain(input)
    .trim()
    .split(',')
    .map((x) => parseInt(x))
    .value();

  // --------------------------------------------------------------------------
  // Part 1
  // --------------------------------------------------------------------------
  const part1 = (days: number) => {
    const spawn = (age: number) => (age === 0 ? [6, 8] : [age - 1]);

    const result = reduce(
      range(days),
      (fish) => chain(fish).map(spawn).flatten().value(),
      fish,
    );

    return result.length;
  };

  // --------------------------------------------------------------------------
  // Part 2
  // --------------------------------------------------------------------------
  const part2 = (days: number) => {
    const initialState = countBy(fish);

    const result = reduce(
      range(days).map((x) => x + 1),
      (state) => ({
        '0': state['1'] ?? 0,
        '1': state['2'] ?? 0,
        '2': state['3'] ?? 0,
        '3': state['4'] ?? 0,
        '4': state['5'] ?? 0,
        '5': state['6'] ?? 0,
        '6': (state['7'] ?? 0) + (state['0'] ?? 0),
        '7': state['8'] ?? 0,
        '8': state['0'] ?? 0,
      }),
      initialState,
    );

    return chain(result).values().sum().value();
  };

  return { part1, part2 };
};
