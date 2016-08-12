const co = require('bluebird-co').co;

// Promsieオブジェクトを返す何かしらの関数
function example(value) {
  return Promise.resolve(value * 2);
}

co(function *() {
  const v1 = yield example(1) //Promiseオブジェクトを処理する
  console.log(v1);

  const v2 = yield example(2) //Promiseオブジェクトを処理する
  console.log(v2);
}).catch((err) => {
  console.log(err);
});
