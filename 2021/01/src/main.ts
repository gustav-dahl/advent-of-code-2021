import * as fs from 'fs';
import * as path from 'path';
import { chain, sum, slice } from 'lodash';

const inputPath = path.resolve(__dirname, './content/input.txt');
const input = fs.readFileSync(inputPath, 'utf8');

const numbers = chain(input.split('\n'))
  .map((x) => parseInt(x))
  .value();

const resultPart1 = chain(numbers)
  .map((x, i) => (i === 0 ? 0 : Math.sign(numbers[i] - numbers[i - 1])))
  .filter((x) => x > 0)
  .sum()
  .value();

console.log(resultPart1);

const window =
  (before, after = 0) =>
  (_number, index, array) => {
    const start = Math.max(0, index - before);
    const end = Math.min(array.length, index + after + 1);
    return slice(array, start, end);
  };

const numbersPart2 = chain(numbers)
  .map(window(2))
  .filter((x) => x.length === 3)
  .map(sum)
  .value();

//console.log(numbersPart2);

const resultPart2 = chain(numbersPart2)
  .map((x, i) =>
    i === 0 ? 0 : Math.sign(numbersPart2[i] - numbersPart2[i - 1]),
  )
  .filter((x) => x > 0)
  .sum()
  .value();

console.log(resultPart2);
