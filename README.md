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
const element2 = gen.next(); // { value: 1, done: false }
const element3 = gen.next(); // { value: 1, done: false }
const element4 = gen.next(); // { value: undefined, done: true }
```
