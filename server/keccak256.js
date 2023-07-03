var sha3 = require('js-sha3').keccak256;

const ethers = require('ethers');

var hash = sha3('hello');
console.log(hash);

let num = BigInt("14864030992728655368375342493362582743109464943830173085505515312453215661600");
console.log(num.toString(16));

// 0x...が必要

// ["0x20dcbe4fd28739879ba77b89c580314cfc25c772d19e1a39f1d3e26a06a52e20", "0x060db6b922680ce600e1a7843c9410686d8d23aed77d49dde5fa7a9a7d76b765"],

proof = {
          "pi_a": [
                    "14864030992728655368375342493362582743109464943830173085505515312453215661600",
                    "2738107212390388394235042313186113870430535687295963573511066266055415871333",
                    "1"
          ],
          "pi_b": [
                    [
                              "6703764743530977113098380046923728853305633388220668364200697129868800891334",
                              "19143623582259109178928011604283620461686148991311438469053250450647072105500"
                    ],
                    [
                              "20764609381555414306709733339797480411182847666885375638657345444060229920941",
                              "16082499706291727776466418300753546206327629639404988451869221811324367583620"
                    ],
                    [
                              "1",
                              "0"
                    ]
          ],
          "pi_c": [
                    "13645535294615029987986088935334936802282058504899782914456926378410049501074",
                    "18315803647241798236183684277745899605238790896318298266887370484051317878483",
                    "1"
          ],
          "protocol": "groth16",
          "curve": "bn128"
}

let a = proof["pi_a"];
a = ["0x"+BigInt(`${a[0]}`).toString(16), "0x"+BigInt(`${a[1]}`).toString(16)];
console.log(a);

let b = proof["pi_b"];
b = [["0x"+BigInt(`${b[0][0]}`).toString(16), "0x"+BigInt(`${b[0][1]}`).toString(16)], ["0x"+BigInt(`${b[1][0]}`).toString(16), "0x"+BigInt(`${b[1][1]}`).toString(16)]];
console.log(b);

let c = proof["pi_c"];
c = ["0x"+BigInt(`${c[0]}`).toString(16), "0x"+BigInt(`${c[1]}`).toString(16)];
console.log(c);

let publicInput = BigInt("6").toString(16);
while (publicInput.length < 64) {
          publicInput = "0" + publicInput;
}
publicInput = "0x" + publicInput;
console.log(publicInput);

// ["0x20dcbe4fd28739879ba77b89c580314cfc25c772d19e1a39f1d3e26a06a52e20", 
// "0x060db6b922680ce600e1a7843c9410686d8d23aed77d49dde5fa7a9a7d76b765"],

// [["0x2a52e82f60aa8f874e97eefbb73116f222a15de0c4b9bb9931770fc0ed53e41c",
// "0x0ed2324631d59ee42ccb471e0174a0549eea0f7464ce797c0de52359ddd119c6"],
// ["0x238e5f4c4a41529f54ec4d22023dae8fc7a6cc76ea9179d01779dc97126ab984", 
// "0x2de85a3858cc85a47290c63c356cdf57cf3e07f2598d90a6992f7ac1ad29e8ad"]],

// ["0x1e2b196a712c64b364addecf9fd34fa7ac7d0b8d88fd2b9dbb5df28f01f77792", 
// "0x287e60a36e6b3d2cfc24a875a52723dc7da6e2cac5296a69eda4e7bc097beed3"],

// ["0x0000000000000000000000000000000000000000000000000000000000000006"]
// ["0000000000000000000000000000000000000000000000000000000000000006"]
