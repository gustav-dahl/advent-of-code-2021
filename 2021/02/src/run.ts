import { chain, reduce, trim } from 'lodash';
import { match } from 'ts-pattern';

export const run = (
  input: string,
): { part1: () => number; part2: () => number } => {
  type Direction = 'forward' | 'up' | 'down';

  type Movement = { direction: Direction; distance: number };

  type Position = { position: number; depth: number; aim?: number };

  type Move = (current: Position) => (x: Movement) => Position;

  const toMovement = (x: string[]): Movement => ({
    direction: x[0] as Direction,
    distance: parseInt(x[1]),
  });

  const movements = chain(input)
    .split('\r\n')
    .map(trim)
    .map((x) => x.split(' '))
    .map(toMovement)
    .value();

  // --------------------------------------------------------------------------
  // Part 1
  // --------------------------------------------------------------------------
  const part1 = () => {
    const moveForward: Move = (current) => (x) => ({
      ...current,
      position: current.position + x.distance,
    });

    const moveDown: Move = (current) => (x) => ({
      ...current,
      depth: current.depth + x.distance,
    });

    const moveUp: Move = (current) => (x) => ({
      ...current,
      depth: current.depth - x.distance,
    });

    const { position, depth } = reduce(
      movements,
      (position, movement) =>
        match(movement)
          .with({ direction: 'forward' }, moveForward(position))
          .with({ direction: 'down' }, moveDown(position))
          .with({ direction: 'up' }, moveUp(position))
          .exhaustive(),
      { position: 0, depth: 0 },
    );

    return position * depth;
  };

  // --------------------------------------------------------------------------
  // Part 2
  // --------------------------------------------------------------------------
  const part2 = () => {
    const moveForward: Move = (current) => (x) => ({
      ...current,
      position: current.position + x.distance,
      depth: current.depth + current.aim * x.distance,
    });

    const moveDown: Move = (current) => (x) => ({
      ...current,
      aim: current.aim + x.distance,
    });

    const moveUp: Move = (current) => (x) => ({
      ...current,
      aim: current.aim - x.distance,
    });

    const { position, depth } = reduce(
      movements,
      (position, movement) =>
        match(movement)
          .with({ direction: 'forward' }, moveForward(position))
          .with({ direction: 'down' }, moveDown(position))
          .with({ direction: 'up' }, moveUp(position))
          .exhaustive(),
      { position: 0, depth: 0, aim: 0 },
    );

    return position * depth;
  };

  return { part1, part2 };
};
