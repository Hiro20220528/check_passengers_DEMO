
import { ethers, JsonRpcProvider } from "./ethers/dist/ethers.min.js";
import { contractABI, contractAddress } from "./contract_info.js";

async function main() {
          const privateKey = "";
          const rpc_url = 'https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78';

          const wallet = new ethers.Wallet(privateKey);
          const provider = new JsonRpcProvider(rpc_url);
          // const provider = ethers.getDefaultProvider("homestead"); // 遅いが何も指定しない
          const walletConnected = wallet.connect(provider);

          const creditContract = new ethers.Contract(contractAddress, contractABI, walletConnected);
          console.log('ok');

          const tx = await creditContract.getUserAddress(1);
          console.log(tx);

          const allMember = await creditContract.getAllUserCreditHistory();
          console.log(allMember[0][0]);
}

main();


