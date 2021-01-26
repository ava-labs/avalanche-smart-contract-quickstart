const hre = require("hardhat");

const AMOUNT_TO_SEND = '0.01'

/**
 * Sends an amount of AVAX from the first address in the private key pool to the 
 * rest of the addresses in the set.
 */
async function main() {
    console.log("Seeding addresses with AVAX")
    const addresses = await ethers.getSigners();

    for (i = 1; i < addresses.length; i++) {
        await sendAvax(addresses[0].address, addresses[i].address, AMOUNT_TO_SEND)
    }
}

/**
 * Send AVAX from one address in the private key set to another in the set.
 * @param {Signer} from address to send from
 * @param {Signer} to address to send to
 * @param {string} amount amount to send in AVAX (not wei)
 */
async function sendAvax(from, to, amount) {
    const params = [{
        from: from,
        to: to,
        value: hre.ethers.utils.parseUnits(amount, 'ether').toHexString()
    }];
    await hre.ethers.provider.send('eth_sendTransaction', params)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });