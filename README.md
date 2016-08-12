# node-generator-example

*を関数名の前に付けると、Generator関数になります。  
yieldでGeneratorから値を返すことができます。

```js
function *unknownSize() {
  yield 1;
  yield 2;
  yield 3;
}
```

Generator関数を実行すると、Generatorオブジェクトを返します。  
値を返すには、Generator関数内で、yield式を使用して行います。
 
yield式は、nextメソッドを実行すると実行され、Generatorから値を取得することができます。

	const v = gen.next(); // vはyieldで返した値

この時、Generator内部では、処理が一旦中断します。  
処理の再開は、nextメソッドが呼ばれると行われます。

nextメソッドが返す値は次のようなフォーマットのオブジェクトです。

|プロパティ|型|説明|
|:----|:----|:----|
|value|any|Generatorから返された値|
|done|boolean|Generatorから続けて、値を返せるかの状態、trueの場合はそれ以上値を返すことができない|

```js
// standard.js

function *unknownSize() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = unknownSize();

const element1 = gen.next(); // { value: 1, done: false }
const element2 = gen.next(); // { value: 2, done: false }
const element3 = gen.next(); // { value: 3, done: false }
const element4 = gen.next(); // { value: undefined, done: true }
```

## 返す値の制限

基本的にGeneratorがいくつ値を返すかは事前にわかりません。  
5つ値を返すかもしれないですし、3つ値を返すかもしれません。  

Generatorから返す値を制御したい場合、Generator関数の引数にパラメータを指定して、関数内で制御します。

下記の例では、いくつ値を返すかを引数で渡して、その数だけGeneratorから値を返しています。

```js
// size-of-item.js
function *knownSize(size) {
  for (let i = 0; i <= size -1; i++) {
    yield i;
  }
}

const gen = knownSize(2);
const element1 = gen.next(); // { value: 1, done: false }
const element2 = gen.next(); // { value: 2, done: false }
const element3 = gen.next(); // { value: undefined, done: true }

console.log(element1);
console.log(element2);
console.log(element3);
```

## Generatorに値を送る

Generatorのnextメソッドに引数を指定すると、Generatorに値を送ることができます。  
送った値を元に、新しい値を送ったりすることができます。

送られるた値は直前の**yield式**の結果として扱われます。

	const [Generatorに送られた値] = yield [返す値];


```js
// send-to-value.js
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
```


## coを使用した非同期処理

coを使用すると、非同期処理を同期的なコードのように書けます。  
Generator関数の中で、yieldを使用して、Promiseオブジェクトを送ると、  
co側で、Promiseオブジェクトを処理し、結果を返してくれるようになります。

```js
// co.js
const co = require('bluebird-co').co;

// Promsieオブジェクトを返す何かしらの関数
function example(value) {
  return Promise.resolve(value * 2);
}

co(function *() {
  //v1は2
  const v1 = yield example(1) //Promiseオブジェクトを処理する
  console.log(v1);

  //v2は4
  const v2 = yield example(2) //Promiseオブジェクトを処理する
  console.log(v2);
}).catch((err) => {
  console.log(err);
});
```
