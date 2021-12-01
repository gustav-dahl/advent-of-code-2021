import * as fs from 'fs';
import * as path from 'path';
import { chain } from 'lodash';
import { assert } from 'console';

//const inputPath = path.resolve(__dirname, './content/input.txt');
//const input = fs.readFileSync(inputPath, 'utf8');

const transformSubjectNumber = (subjectNumber: number, loopSize: number, value=1) => {
  //let value = 1;

  const iterate = (x) => (x * subjectNumber) % 20201227;

  //for (let i = 0; i < loopSize; i++) {
    value = iterate(value);
  //}

  return value;
};

let loopSize = 1;
let x = 1;
while (x !== 8184785) {
  console.log('loop size', loopSize);

  x = transformSubjectNumber(7, loopSize,x);
  console.log('x', x);
  loopSize++;
}

console.log('finished');

//const inverseTransformSubjectNumber = (subjectNumber: number) => {
//  let loopSize = 0;
//  let value = subjectNumber;
//  while (subjectNumber != 7) {
//    value = 20201227 % value;
//    value = subjectNumber / value;
//    loopSize++;
//  }
//  //for (let i = 0; i < loopSize; i++) {
//  //  value = value * subjectNumber;
//  //  value = value % 20201227;
//  //}

//  return loopSize;
//};

////For example, suppose you know that the card's public key is 5764801.
//// With a little trial and error, you can work out that the card's loop size
//// must be 8, because transforming the initial subject number of 7 with
////aa loop size of 8 produces 5764801.
//const card = {
//  publicKey: 5764801,
//  loopSize: 8,
//};

//// Then, suppose you know that the door's public key is 17807724.
//// By the same process, you can determine that the door's loop size is 11,
//// because transforming the initial subject number of 7 with a loop
//// size of 11 produces 17807724.
//const door = {
//  publicKey: 17807724,
//  loopSize: 11,
//};

//const cardEncryptionKey = transformSubjectNumber(door.publicKey, card.loopSize);
////const foo = inverseTransformSubjectNumber(door.publicKey);
//const doorEncryptionKey = transformSubjectNumber(card.publicKey, door.loopSize);

//assert(cardEncryptionKey === doorEncryptionKey);

console.log('foo');
