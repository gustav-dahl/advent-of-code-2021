import * as fs from 'fs';
import * as path from 'path';
import { chain } from 'lodash';

const inputPath = path.resolve(__dirname, './content/input.txt');
const input = fs.readFileSync(inputPath, 'utf8');

const passwords = chain(input.split('\r\n'))
  .map((x) => x.split(' '))
  .value();

const result = chain(passwords)
  .map((x) => ({
    min: parseInt(x[0].split('-')[0]),
    max: parseInt(x[0].split('-')[1]),
    pattern: x[1].split(':')[0],
    value: x[2],
  }))
  .map((x) => ({
    ...x,
    count: [...x.value].filter((y) => y === x.pattern).length,
  }))
  .filter((x) => x.min <= x.count && x.count <= x.max)
  .value().length;

console.log(result);
