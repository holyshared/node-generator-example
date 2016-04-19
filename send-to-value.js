'use strict';

function *generatorOfValue(defaultValue) {
  const v1 = yield defaultValue; // v1はnextで送られた値
  const v2 = yield v1 * 2;       // v2はnextで送られた値
  const v3 = yield v2 * 2;       // v3はnextで送られた値
  yield v3 * 2;
}

const gen = generatorOfValue(1);
const element1 = gen.next();                // 値を取り出す
const element2 = gen.next(element1.value);  // 値を送る
const element3 = gen.next(element2.value);
const element4 = gen.next(element3.value);
const element5 = gen.next(element4.value);

console.log(element1);  // 1
console.log(element2);  // 2
console.log(element3);  // 4
console.log(element4);  // 8
console.log(element5);  // undefined
