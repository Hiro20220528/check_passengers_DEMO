const contractAddress = "0x57492274381BBe996508AC0F6e0FBF40DC9817Ed";

const rpc_url = 'https://rpc-mumbai.maticvigil.com/';
// const rpc_url = 'https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78';


const contractABI = [
          {
                    "anonymous": false,
                    "inputs": [
                              {
                                        "indexed": true,
                                        "internalType": "address",
                                        "name": "previousOwner",
                                        "type": "address"
                              },
                              {
                                        "indexed": true,
                                        "internalType": "address",
                                        "name": "newOwner",
                                        "type": "address"
                              }
                    ],
                    "name": "OwnershipTransferred",
                    "type": "event"
          },
          {
                    "anonymous": false,
                    "inputs": [
                              {
                                        "indexed": false,
                                        "internalType": "address",
                                        "name": "userAddress",
                                        "type": "address"
                              }
                    ],
                    "name": "getPermission",
                    "type": "event"
          },
          {
                    "anonymous": false,
                    "inputs": [
                              {
                                        "indexed": false,
                                        "internalType": "bool",
                                        "name": "proofResult",
                                        "type": "bool"
                              }
                    ],
                    "name": "noticeRsesult",
                    "type": "event"
          },
          {
                    "inputs": [
                              {
                                        "internalType": "uint32",
                                        "name": "_permissionLimitms",
                                        "type": "uint32"
                              }
                    ],
                    "name": "changePermissionLimitms",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
          },
          {
                    "inputs": [],
                    "name": "getAllUserCreditHistory",
                    "outputs": [
                              {
                                        "internalType": "uint16[2][]",
                                        "name": "",
                                        "type": "uint16[2][]"
                              }
                    ],
                    "stateMutability": "view",
                    "type": "function"
          },
          {
                    "inputs": [],
                    "name": "getPermissionLimitms",
                    "outputs": [
                              {
                                        "internalType": "uint32",
                                        "name": "",
                                        "type": "uint32"
                              }
                    ],
                    "stateMutability": "view",
                    "type": "function"
          },
          {
                    "inputs": [
                              {
                                        "internalType": "uint16",
                                        "name": "userId",
                                        "type": "uint16"
                              }
                    ],
                    "name": "getUserAddress",
                    "outputs": [
                              {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                              }
                    ],
                    "stateMutability": "view",
                    "type": "function"
          },
          {
                    "inputs": [
                              {
                                        "internalType": "address",
                                        "name": "userAddress",
                                        "type": "address"
                              }
                    ],
                    "name": "getUserCreditHistory",
                    "outputs": [
                              {
                                        "internalType": "uint16[2]",
                                        "name": "",
                                        "type": "uint16[2]"
                              }
                    ],
                    "stateMutability": "view",
                    "type": "function"
          },
          {
                    "inputs": [
                              {
                                        "internalType": "address",
                                        "name": "userAddress",
                                        "type": "address"
                              }
                    ],
                    "name": "getUserId",
                    "outputs": [
                              {
                                        "internalType": "uint16",
                                        "name": "",
                                        "type": "uint16"
                              }
                    ],
                    "stateMutability": "view",
                    "type": "function"
          },
          {
                    "inputs": [],
                    "name": "getUserNumber",
                    "outputs": [
                              {
                                        "internalType": "uint16",
                                        "name": "",
                                        "type": "uint16"
                              }
                    ],
                    "stateMutability": "view",
                    "type": "function"
          },
          {
                    "inputs": [
                              {
                                        "internalType": "address",
                                        "name": "userAddress",
                                        "type": "address"
                              }
                    ],
                    "name": "getUserRentalCount",
                    "outputs": [
                              {
                                        "internalType": "uint16",
                                        "name": "",
                                        "type": "uint16"
                              }
                    ],
                    "stateMutability": "view",
                    "type": "function"
          },
          {
                    "inputs": [
                              {
                                        "internalType": "address",
                                        "name": "userAddress",
                                        "type": "address"
                              }
                    ],
                    "name": "getUserVerifyCount",
                    "outputs": [
                              {
                                        "internalType": "uint16",
                                        "name": "",
                                        "type": "uint16"
                              }
                    ],
                    "stateMutability": "view",
                    "type": "function"
          },
          {
                    "inputs": [
                              {
                                        "internalType": "address",
                                        "name": "userAddress",
                                        "type": "address"
                              },
                              {
                                        "internalType": "bytes32",
                                        "name": "hashed_text",
                                        "type": "bytes32"
                              }
                    ],
                    "name": "givePermission",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
          },
          {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [
                              {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                              }
                    ],
                    "stateMutability": "view",
                    "type": "function"
          },
          {
                    "inputs": [],
                    "name": "renounceOwnership",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
          },
          {
                    "inputs": [
                              {
                                        "internalType": "address",
                                        "name": "newOwner",
                                        "type": "address"
                              }
                    ],
                    "name": "transferOwnership",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
          },
          {
                    "inputs": [
                              {
                                        "internalType": "uint256[2]",
                                        "name": "a",
                                        "type": "uint256[2]"
                              },
                              {
                                        "internalType": "uint256[2][2]",
                                        "name": "b",
                                        "type": "uint256[2][2]"
                              },
                              {
                                        "internalType": "uint256[2]",
                                        "name": "c",
                                        "type": "uint256[2]"
                              },
                              {
                                        "internalType": "uint256[1]",
                                        "name": "publicInput",
                                        "type": "uint256[1]"
                              },
                              {
                                        "internalType": "string",
                                        "name": "planeText",
                                        "type": "string"
                              }
                    ],
                    "name": "tryProof",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
          },
          {
                    "inputs": [
                              {
                                        "internalType": "uint256[2]",
                                        "name": "a",
                                        "type": "uint256[2]"
                              },
                              {
                                        "internalType": "uint256[2][2]",
                                        "name": "b",
                                        "type": "uint256[2][2]"
                              },
                              {
                                        "internalType": "uint256[2]",
                                        "name": "c",
                                        "type": "uint256[2]"
                              },
                              {
                                        "internalType": "uint256[1]",
                                        "name": "input",
                                        "type": "uint256[1]"
                              }
                    ],
                    "name": "verifyProof",
                    "outputs": [
                              {
                                        "internalType": "bool",
                                        "name": "r",
                                        "type": "bool"
                              }
                    ],
                    "stateMutability": "view",
                    "type": "function"
          }
];

// 別ファイルから変数へのアクセス
module.exports = {
          'contractAddress': contractAddress,
          'rpc_url': rpc_url,
          'contractABI': contractABI,

}