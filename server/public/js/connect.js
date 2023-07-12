import { ethers, JsonRpcProvider } from "./ethers/dist/ethers.min.js";
import { contractABI, contractAddress, rpc_url } from "./contract_info.js";

const walletAddress = document.getElementById('account_number');
const rental = document.getElementById('rental');
const proof = document.getElementById('proof');


async function main() {
          try {
                    const privateKey = JSON.parse(localStorage.getItem('unSaftyPrivateKey'));
                    // console.log(privateKey);


                    const wallet = new ethers.Wallet(privateKey);
                    const provider = new JsonRpcProvider(rpc_url);
                    // const provider = ethers.getDefaultProvider("homestead"); // 遅いが何も指定しない
                    const walletConnected = wallet.connect(provider);

                    const creditContract = new ethers.Contract(contractAddress, contractABI, walletConnected);

                    // console.log(wallet.address);

                    walletAddress.innerHTML = wallet.address;

                    const rentalStatus = await creditContract.getUserCreditHistory(wallet.address);
                    console.log(rentalStatus);
                    rental.innerHTML = Number(rentalStatus[0]) + '回使用';
                    proof.innerHTML = Number(rentalStatus[1]) + '回証明';
          } catch (error) {
                    walletAddress.innerHTML = 'アカウントが接続されていません';
                    rental.innerHTML = 'アカウントが接続されていません';
                    proof.innerHTML = 'アカウントが接続されていません';
          }

}

main();


