API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { ethers } = require("hardhat");
// const { AlchemyProvider } = require("@ethersproject/providers");
const contract = require("..//artifacts/blockchain/contracts/CarShareCreditRatingContract.sol/CarShareCreditRatingContract.json");

// provider - Alchemy
const alchemyProvider = new ethers.AlchemyProvider(network = "matic-mumbai", API_KEY);

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const CarShareCreditRatingContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
          // const tx = await CarShareCreditRatingContract.givePermission(
          //           "0x9a9f8B37f4CfEf89b578a9F248C8ed9c7F1f7236",
          //           "0x1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8" // hello
          //           );
          // await tx.wait(); // wait for the transaction to be mined
          const tx = await CarShareCreditRatingContract.getUserAddress(1);
          console.log(tx);

          // const test = await CarShareCreditRatingContract.verifyProof(
          //           ["0x20dcbe4fd28739879ba77b89c580314cfc25c772d19e1a39f1d3e26a06a52e20", "0x060db6b922680ce600e1a7843c9410686d8d23aed77d49dde5fa7a9a7d76b765"], [["0x2a52e82f60aa8f874e97eefbb73116f222a15de0c4b9bb9931770fc0ed53e41c", "0x0ed2324631d59ee42ccb471e0174a0549eea0f7464ce797c0de52359ddd119c6"], ["0x238e5f4c4a41529f54ec4d22023dae8fc7a6cc76ea9179d01779dc97126ab984", "0x2de85a3858cc85a47290c63c356cdf57cf3e07f2598d90a6992f7ac1ad29e8ad"]], ["0x1e2b196a712c64b364addecf9fd34fa7ac7d0b8d88fd2b9dbb5df28f01f77792", "0x287e60a36e6b3d2cfc24a875a52723dc7da6e2cac5296a69eda4e7bc097beed3"], ["0x0000000000000000000000000000000000000000000000000000000000000006"]
          // );
          // console.log(test);

          let text = "1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8";
          // const testPermission = await CarShareCreditRatingContract.givePermission(
          //           "0x9a9f8B37f4CfEf89b578a9F248C8ed9c7F1f7236",
          //           "0x1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8" // hello
          // );
          // await testPermission.wait();

          const allMember = await CarShareCreditRatingContract.getAllUserCreditHistory();
          console.log(allMember);

          for( let i = 0; i < allMember.length; i++) {
                    console.log(Number(allMember[i][0]), Number(allMember[i][1]));
          }
}

main().then(() => process.exit(0))
          .catch(error => {
                    console.error(error);
                    process.exit(1);
          }
          );

// npx hardhat run ./blockchain/scripts/interact.js