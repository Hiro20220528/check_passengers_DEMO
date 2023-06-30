var sha3 = require('js-sha3').keccak256;

var hash = sha3('hello');
console.log(hash);

// 0x...が必要
