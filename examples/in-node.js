/* eslint-disable no-console */
const protoDeep = require('..');

console.log('Version', protoDeep.VERSION);
console.log(protoDeep({ foo: 42 }));
