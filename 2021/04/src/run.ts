import {
  chain,
  compact,
  find,
  isNumber,
  isString,
  last,
  reduce,
  without,
} from 'lodash';

const log = console.log;

export type Board = (number | string)[][];

const isMarked = (x: number | string) => isString(x) && x === 'x';

const isHorizontalWin = (board: Board) => board.some((x) => x.every(isMarked));

const transpose = (board: Board) =>
  board[0].map((x, i) => board.map((x) => x[i]));

const isVerticalWin = (board: Board) => isHorizontalWin(transpose(board));

export const isWinner = (board: Board) =>
  isVerticalWin(board) || isHorizontalWin(board);

const markBoards = (calledNumber: number) => (board: Board) =>
  chain(board)
    .flatten()
    .map((x) => (x === calledNumber ? 'x' : x))
    .chunk(5)
    .value();

const extractRandomNumbers = (input: string) =>
  chain(input)
    .split('\r\n')
    .head()
    .split(',')
    .map((x) => parseInt(x))
    .value();

const extractBoards = (input: string): Board[] =>
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

  type Round = {
    round: number;
    calledNumbers: number[];
    winners: Board[];
    boards: Board[];
  };

  const rounds: Round[] = [
    {
      round: 0,
      calledNumbers: [],
      winners: [],
      boards: boards,
    },
  ];

  const result = reduce(
    randomNumbers,
    (rounds, calledNumber) => {
      const lastRound = last(rounds);
      const updateBoards = lastRound.boards.map(markBoards(calledNumber));

      const calledNumbers = [...lastRound.calledNumbers, calledNumber];
      const winners = [...lastRound.winners, ...updateBoards.filter(isWinner)];
      const boards = without(updateBoards, ...winners);

      return [
        ...rounds,
        {
          round: lastRound.round + 1,
          calledNumbers,
          winners,
          boards,
        },
      ];
    },
    rounds,
  );

  //log(result);

  const part1 = () => {
    const round = find(result, (x) => x.winners.length === 1);
    const calledNumber = last(round.calledNumbers);
    const sumUnmarkedNumbers = chain(round.winners)
      .first()
      .flatten()
      .filter(isNumber)
      .sum()
      .value();

    //log(calledNumber);
    //log(sumUnmarkedNumbers);

    return calledNumber * sumUnmarkedNumbers;
  };

  const part2 = () => {
    const round = find(result, (x) => x.boards.length === 0);
    const calledNumber = last(round.calledNumbers);
    const sumUnmarkedNumbers = chain(round.winners)
      .last()
      .flatten()
      .filter(isNumber)
      .sum()
      .value();

    //log(calledNumber);
    //log(sumUnmarkedNumbers);

    return calledNumber * sumUnmarkedNumbers;
  };

  return { part1, part2 };
};
