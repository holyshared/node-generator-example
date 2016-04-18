'use strict';

// *を関数名の前に付けると、Generator関数になる
// yieldでGeneratorから値を返す
function *unknownSize() {
  yield 1;
  yield 2;
  yield 3;
}

// Generator関数を実行すると、Generatorを返す
const gen = unknownSize();

const element1 = gen.next();
const element2 = gen.next();
const element3 = gen.next();
const element4 = gen.next();

// Generatorから値を返すことができる場合は、doneがfalseになる
console.log(element1);
console.log(element2);
console.log(element3);

// Generatorから値を返すことができない場合は、doneがtrueになる
console.log(element4);
