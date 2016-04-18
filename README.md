# node-generator-example

*を関数名の前に付けると、Generator関数になる。
yieldでGeneratorから値を返す。

```js
function *unknownSize() {
  yield 1;
  yield 2;
  yield 3;
}
```

Generator関数を実行すると、Generatorオブジェクトを返します。
nextメソッドを実行することで、Generatorから値を取り出せます。

nextメソッドが返す値は次のようなフォーマットのオブジェクトです。

|プロパティ|型|説明|
|:----|:----|:----|
|value|any|Generatorから返された値|
|done|boolean|Generatorから続けて、値を返せるかの状態、trueの場合はそれ以上値を返すことができない|

```js
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
