const hre = require("hardhat");

async function main() {
          const deployedContract = await ethers.deployContract("CarShareCreditRatingContract");
          await deployedContract.waitForDeployment();
          console.log("CarShareCreditRatingContract:", await deployedContract.getAddress());
}

main()
.then(() => process.exit(0))
.catch(error => {
          console.error(error);
          process.exit(1);
});
