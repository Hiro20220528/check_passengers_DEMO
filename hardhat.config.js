/** @type import('hardhat/config').HardhatUserConfig */

require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const { API_URL, PRIVATE_KEY } = process.env;


module.exports = {
  solidity: "0.6.11",
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {},
    mumbai: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  paths: {
    sources: "./blockchain/contracts",
    artifacts: "./blockchain/artifacts",
    cache: "./blockchain/cache",
  },
};
