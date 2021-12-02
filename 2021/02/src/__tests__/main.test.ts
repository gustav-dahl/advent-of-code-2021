import * as fs from 'fs';
import * as path from 'path';
import { run } from '../run';

const inputPath = path.resolve(__dirname, '../content/input_test.txt');
const input = fs.readFileSync(inputPath, 'utf8');

describe('parts', () => {

  it('part-1', () => {
    const parts = run(input);
    const result = parts.part1();
    console.log('resultPart1:', result);
    expect(result).toBe(150);
  });

  it('part-2', () => {
    const parts = run(input);
    const result = parts.part2();
    console.log('resultPart2:', result);
    expect(result).toBe(900);
  });
});
