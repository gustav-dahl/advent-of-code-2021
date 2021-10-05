import * as fs from 'fs';
import * as path from 'path';
import { chain, includes } from 'lodash';

const inputPath = path.resolve(__dirname, './content/input.txt');
const input = fs.readFileSync(inputPath, 'utf8');

const numbers = chain(input.split('\n'))
  .map((x) => parseInt(x))
  .value();

const result = chain(numbers)
  .map((x) => 2020 - x)
  .filter((x) => includes(numbers, x))
  .map(x => (2020-x)*x)
  .first()
  .value();

console.log(result);
