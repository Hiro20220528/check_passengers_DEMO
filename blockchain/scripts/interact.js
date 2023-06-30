API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { ethers } = require("hardhat");
// const { AlchemyProvider } = require("@ethersproject/providers");
const contract = require("../artifacts/contracts/CarShareCreditRatingContract.sol/CarShareCreditRatingContract.json");

// provider - Alchemy
const alchemyProvider = new ethers.AlchemyProvider(network = "matic-mumbai", API_KEY);

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const CarShareCreditRatingContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
          const tx = await CarShareCreditRatingContract.givePermission(
                    "0x9a9f8B37f4CfEf89b578a9F248C8ed9c7F1f7236",
                    "0x1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8" // hello
                    );
          await tx.wait(); // wait for the transaction to be mined
}

main().then(() => process.exit(0))
          .catch(error => {
                    console.error(error);
                    process.exit(1);
                    }
          );