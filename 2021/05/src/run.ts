import { count } from 'console';
import {
  chain,
  compact,
  countBy,
  flatMap,
  flatten,
  head,
  isArray,
  isEmpty,
  last,
  map,
  range,
  reduce,
  sum,
  tail,
  without,
  zip,
} from 'lodash';
import { match } from 'ts-pattern';

const log = console.log;

type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  points: number[][];
};

export const run = (
  input: string,
): { part1: () => number; part2: () => number } => {
  const createLine = (s: string) => {
    const parts = s.split(' -> ').map((x) => x.split(','));

    const coordinates = {
      x1: parseInt(parts[0][0]),
      y1: parseInt(parts[0][1]),
      x2: parseInt(parts[1][0]),
      y2: parseInt(parts[1][1]),
    };

    //log(coordinates);

    const { x1, x2, y1, y2 } = coordinates;
    const xCoordinates = match([x1, x2])
      .when(
        ([x1, x2]) => x1 < x2,
        ([x1, x2]) => range(x1, x2 + 1),
      )
      .when(
        ([x1, x2]) => x2 < x1,
        ([x1, x2]) => range(x1, x2 - 1),
      )
      .otherwise(() => [x1, x2]);

    const yCoordinates = match([y1, y2])
      .when(
        ([y1, y2]) => y1 < y2,
        ([y1, y2]) => range(y1, y2 + 1),
      )
      .when(
        ([y1, y2]) => y2 < y1,
        ([y1, y2]) => range(y1, y2 - 1),
      )
      .otherwise(() => [y1, y2]);

    //log(xCoordinates);
    //log(yCoordinates);

    const points = zip(xCoordinates, yCoordinates).map((x) => [
      x[0] === undefined ? coordinates.x1 : x[0],
      x[1] === undefined ? coordinates.y1 : x[1],
    ]);

    //log(points);

    return {
      ...coordinates,
      points,
    };
  };

  const isHorizontal = (line: Line) => line.x1 === line.x2;
  const isVertical = (line: Line) => line.y1 === line.y2;

  // --------------------------------------------------------------------------
  // Part 1
  // --------------------------------------------------------------------------
  const part1 = () => {
    const lines = chain(input)
      .split('\r\n')
      .map(createLine)
      .filter((x) => isVertical(x) || isHorizontal(x))
      .value();

    //log(lines);

    const xMax =
      chain(lines)
        .map((x) => [x.x1, x.x2])
        .flatMap((x) => x)
        .max()
        .value() + 1;

    const yMax =
      chain(lines)
        .map((x) => [x.y1, x.y2])
        .flatMap()
        .max()
        .value() + 1;

    //log(xMax, yMax);

    const dashboard = [...new Array(xMax)].map(() =>
      [...new Array(yMax)].map((x) => 0),
    );

    //log(dashboard);

    log(dashboard[9]);
    const result = chain(
      reduce(
        flatMap(lines, (x) => x.points),
        (result, [x, y]) => {
          result[x][y]++;
          return result;
        },
        dashboard,
      ),
    )
      .flatMap((x) => x)
      .filter((x) => x >= 2)
      .value().length;

    //log(result);

    return result;
  };

  // --------------------------------------------------------------------------
  // Part 2
  // --------------------------------------------------------------------------
  const part2 = () => {
    const lines = chain(input).split('\r\n').map(createLine).value();

    //log(lines);

    const xMax =
      chain(lines)
        .map((x) => [x.x1, x.x2])
        .flatMap((x) => x)
        .max()
        .value() + 1;

    const yMax =
      chain(lines)
        .map((x) => [x.y1, x.y2])
        .flatMap()
        .max()
        .value() + 1;

    //log(xMax, yMax);

    const dashboard = [...new Array(xMax)].map(() =>
      [...new Array(yMax)].map((x) => 0),
    );

    //log(dashboard);

    log(dashboard[9]);
    const result = chain(
      reduce(
        flatMap(lines, (x) => x.points),
        (result, [x, y]) => {
          result[x][y]++;
          return result;
        },
        dashboard,
      ),
    )
      .flatMap((x) => x)
      .filter((x) => x >= 2)
      .value().length;

    //log(result);

    return result;
  };

  return { part1, part2 };
};
