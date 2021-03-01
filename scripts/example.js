const { Contract } = require("ethers");
const hre = require("hardhat");

// TODO: Enter your deployed contract address
const COIN_ADDR = "0x0000000000000000000000000000000000000000";

/**
 * Empty. Try calling some functions here.
 */
async function main() {

}

/**
 * Takes a transaction response and calculates the amount of gas used and converts 
 * it to AVAX. Prints results to console.
 * 
 * @param {TransactionResponse} tx transactionn to extract gas info from
 * @param {string} methodName Name of method to print
 */
async function calculateGasFee(tx, methodName) {
    const gasPrice = 470000000000;
    const weiPerAvax = Number('1000000000000000000');

    const txReceipt = await tx.wait();
    const gasUsed = txReceipt.gasUsed.toString()
    const avax = gasUsed * gasPrice / weiPerAvax;
    console.log(methodName, "gas used:", gasUsed);
    console.log(methodName, "AVAX cost:", avax);
}

/**
 * Calls transfer on the provided contract. Transfers the ERC20 from the from signer 
 * to the to signer for the amount of amount.
 * 
 * @param {Signer} from signer to send from
 * @param {Signer} to signer to send to
 * @param {number} amount amount to send
 * @param {Contract} coinContract ERC20 contract to call
 */
async function sendERC20(from, to, amount, coinContract) {
    const coin = coinContract.connect(from);
    tx = await coin.transfer(to.getAddress(), amount);
    
    await calculateGasFee(tx, "Transfer");
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });