import * as fs from 'fs';
import * as path from 'path';
import { run } from './run';

const inputPath = path.resolve(__dirname, './content/input.txt');
const input = fs.readFileSync(inputPath, 'utf8');
const parts = run(input);
console.log('resultPart1', parts.part1());
console.log('resultPart2', parts.part2());
