import * as fs from 'fs';
import * as path from 'path';
import { run, parse, isCorrupted, isIncomplete } from '../run';

const inputPath = path.resolve(__dirname, '../content/input_test.txt');
const input = fs.readFileSync(inputPath, 'utf8');

describe('parts', () => {
  it('isCorrupted', () => {
    expect(isCorrupted('([])')).toBeFalsy();
    expect(isCorrupted('{()()()}')).toBeFalsy();
    expect(isCorrupted('<([{}])>')).toBeFalsy();
    expect(isCorrupted('[<>({}){}[([])<>]]')).toBeFalsy();
    expect(isCorrupted('(((((((((())))))))))')).toBeFalsy();

    expect(isCorrupted('(]')).toBeTruthy();
    expect(isCorrupted('{()()()>')).toBeTruthy();
    expect(isCorrupted('(((()))}')).toBeTruthy();
    expect(isCorrupted('<([]){()}[{}])')).toBeTruthy();
  });

  it('isIncomplete', () => {
    expect(isIncomplete('({(<(())[]>[[{[]{<()<>>')).toBeTruthy();
    expect(isIncomplete('[(()[<>])]({[<{<<[]>>(')).toBeTruthy();
    expect(isIncomplete('(((({<>}<{<{<>}{[]{[]{}')).toBeTruthy();
    expect(isIncomplete('{<[[]]>}<{[{[{[]{()[[[]')).toBeTruthy();
    expect(isIncomplete('<{([{{}}[<[[[<>{}]]]>[]]')).toBeTruthy();

    expect(isIncomplete('{([(<{}[<>[]}>{[]{[(<()>')).toBeFalsy();
    expect(isIncomplete('[[<[([]))<([[{}[[()]]]')).toBeFalsy();
    expect(isIncomplete('[{[{({}]{}}([{[{{{}}([]')).toBeFalsy();
    expect(isIncomplete('[<(<(<(<{}))><([]([]()')).toBeFalsy();
    expect(isIncomplete('<{([([[(<>()){}]>(<<{{')).toBeFalsy();
  });

  it('part-1', () => {
    const parts = run(input);
    const result_1 = parts.part1();
    console.log('resultPart1:', result_1);
    expect(result_1).toBe(26397);
  });

  it('part-2', () => {
    const parts = run(input);
    const result_2 = parts.part2();
    console.log('resultPart2:', result_2);
    expect(result_2).toBe(288957);
  });
});
