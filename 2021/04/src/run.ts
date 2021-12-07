import { count } from 'console';
import {
  chain,
  compact,
  countBy,
  flatMap,
  head,
  isArray,
  isEmpty,
  last,
  map,
  reduce,
  sum,
  tail,
  without,
  zip,
} from 'lodash';

const log = console.log;

const extractRandomNumbers = (input: string) =>
  chain(input)
    .split('\r\n')
    .head()
    .split(',')
    .map((x) => parseInt(x))
    .value();

const extractBoards = (input: string) =>
  chain(input)
    .split('\r\n')
    .tail()
    .compact()
    .map((x) => compact(x.trim().split(' ')).map((x) => parseInt(x)))
    .chunk(5)
    .value();

export const run = (
  input: string,
): { part1: () => number; part2: () => number } => {
  const randomNumbers = extractRandomNumbers(input);
  const boards = extractBoards(input);

  //log(randomNumbers);
  //log(boards);

  const markBoards = (calledNumber: number) => (board: number[][]) => {
    return board.map((x) => without(x, calledNumber));
  };

  const checkForWinner = (boards: number[][][]) =>
    boards.map(isWinner).findIndex((x) => x === true);

  const isWinner = (board: number[][]) =>
    !chain(board).filter(isEmpty).isEmpty().value() ||
    !chain(board).zip().filter(isEmpty).isEmpty().value();

  // --------------------------------------------------------------------------
  // Part 1
  // --------------------------------------------------------------------------
  const part1 = () => {
    const result = reduce(
      randomNumbers,
      (result, calledNumber) => {
        if (result.winner) {
          return result;
        }

        const updateBoards = result.boards.map(markBoards(calledNumber));
        const winner = checkForWinner(updateBoards);

        return {
          boards: updateBoards,
          calledNumbers: [...result.calledNumbers, calledNumber],
          winner: !result.winner && winner !== -1 ? winner : undefined,
        };
      },
      { boards, calledNumbers: [], winner: undefined },
    );

    log(result);

    const winningBoard = result.boards[result.winner];
    const calledWinnigNumber = last(result.calledNumbers);

    const foo = chain(winningBoard)
      .map((x) => sum(x))
      .sum()
      .value();
    log(foo);

    return foo * calledWinnigNumber;
  };

  // --------------------------------------------------------------------------
  // Part 2
  // --------------------------------------------------------------------------
  const part2 = () => {
    const checkForLastWinner = (boards: number[][][]) => {
      const foo = chain(boards)
        .map(isWinner)
        .countBy((x) => x)
        .value();

      log(foo);
      if (foo.false === undefined) {
        return -999;
      }
      if (foo.false === 1) {
        return boards.map(isWinner).findIndex((x) => x === false);
      }

      return -1;
    };

    const result = reduce(
      randomNumbers,
      (result, calledNumber) => {
        //log(result);
        //if (result.lastWinner !== -1) {
        //  return result;
        //}

        const updateBoards = result.boards.map(markBoards(calledNumber));
        const lastWinner = checkForLastWinner(updateBoards);

        if (lastWinner === -999) {
          return result;
        }

        return {
          boards: updateBoards,
          calledNumbers: [...result.calledNumbers, calledNumber],
          lastWinner: lastWinner,
        };
      },
      { boards, calledNumbers: [], lastWinner: -1 },
    );

    log(result);

    const lastWinnerBoard = result.boards[result.lastWinner];
    const calledWinnigNumber = last(result.calledNumbers);

    const foo = chain(lastWinnerBoard)
      .map((x) => sum(x))
      .sum()
      .value();
    log(foo);

    return foo * calledWinnigNumber;
  };

  return { part1, part2 };
};
