import {
  chain,
  curry,
  findKey,
  first,
  isEmpty,
  last,
  reduce,
  reverse,
} from 'lodash';
import { match } from 'ts-pattern';

const log = console.log;

const tokens = {
  '[': ']',
  '(': ')',
  '{': '}',
  '<': '>',
};

const isOpeningCharacter = (character: string) =>
  chain(tokens).keys().includes(character).value();

const isClosingCharacter = (character: string) =>
  chain(tokens).values().includes(character).value();

const getOpeningCharacter = (character: string) =>
  findKey(tokens, (x) => x === character);

const getClosingCharacter = (character: string) => tokens[character];

type Result = {
  stack: string[];
  tokens: string[];
  invalidCharacters: string[];
};

export const parse = (line: string): Result => {
  const reduceOpeningCharacter = curry((result: Result, character: string) => {
    result.stack.push(character);
    return result;
  });

  const reduceClosingCharacter = curry(
    (result: Result, closingCharacter: string) => {
      const openingCharacter = getOpeningCharacter(closingCharacter);
      return openingCharacter === last(result.stack)
        ? {
            ...result,
            stack: result.stack.slice(0, -1),
            tokens: [
              ...result.tokens,
              `${openingCharacter}${closingCharacter}`,
            ],
          }
        : {
            ...result,
            invalidCharacters: [...result.invalidCharacters, closingCharacter],
          };
    },
  );

  const initialResult: Result = {
    stack: [],
    tokens: [],
    invalidCharacters: [],
  };

  const characters = line.split('');

  const result = reduce(
    characters,
    (result, character) =>
      match(character)
        .when(isOpeningCharacter, reduceOpeningCharacter(result))
        .when(isClosingCharacter, reduceClosingCharacter(result))
        .run(),
    initialResult,
  );

  //log(result);

  return result;
};

export const isCorrupted = (line: string) =>
  !isEmpty(parse(line).invalidCharacters);

export const isIncomplete = (line: string) =>
  !isEmpty(parse(line).stack) && !isCorrupted(line);

export const run = (
  input: string,
): {
  part1: () => number;
  part2: () => number;
} => {
  const lines = input.split('\r\n');

  // --------------------------------------------------------------------------
  // Part 1
  // --------------------------------------------------------------------------
  const part1 = () => {
    const score = (character: string) =>
      match(character)
        .with(')', () => 3)
        .with(']', () => 57)
        .with('}', () => 1197)
        .with('>', () => 25137)
        .run();

    const result = chain(lines)
      .filter((x) => !isIncomplete(x))
      .map(parse)
      .map((x) => first(x.invalidCharacters))
      .map(score)
      .sum()
      .value();

    //log(result);

    return result;
  };

  // --------------------------------------------------------------------------
  // Part 2
  // --------------------------------------------------------------------------
  const part2 = () => {
    const score = (character: string) =>
      match(character)
        .with(')', () => 1)
        .with(']', () => 2)
        .with('}', () => 3)
        .with('>', () => 4)
        .run();

    const scores = chain(lines)
      .filter((x) => !isCorrupted(x))
      .map(parse)
      .map((x) => reverse(x.stack.map(getClosingCharacter)))
      .map((line) => reduce(line, (acc, x) => acc * 5 + score(x), 0))
      .sortBy()
      .value();

    const result = scores[Math.round((scores.length - 1) / 2)];

    //log(result);

    return result;
  };

  return { part1, part2 };
};
