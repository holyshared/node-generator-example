'use strict';

function *knownSize(size) {
  for (let i = 0; i <= size -1; i++) {
    yield i;
  }
}

const gen = knownSize(2);
const element1 = gen.next();
const element2 = gen.next();
const element3 = gen.next();

console.log(element1);
console.log(element2);
console.log(element3);
