// test/Airdrop.js
// Load dependencies
const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');
const Web3 = require('web3');

const OWNER_ADDRESS = ethers.utils.getAddress("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

const DECIMALS = 2;

const AMT = 150

///////////////////////////////////////////////////////////
// SEE https://hardhat.org/tutorial/testing-contracts.html
// FOR HELP WRITING TESTS
// USE https://github.com/gnosis/mock-contract FOR HELP
// WITH MOCK CONTRACT
///////////////////////////////////////////////////////////

// Start test block
describe('Coin', function () {
    before(async function () {
        this.Coin = await ethers.getContractFactory("ExampleERC20");
        this.MockContract = await ethers.getContractFactory("contracts/MockContract.sol:MockContract");
    });

    beforeEach(async function () {
        this.coin = await this.Coin.deploy()
        await this.coin.deployed()
        this.mock = await this.MockContract.deploy()
        await this.mock.deployed()
    });

    // Test cases

    //////////////////////////////
    //       Constructor 
    //////////////////////////////
    describe("Constructor", function () {
        it('mock test', async function () {
            // If another contract calls balanceOf on the mock contract, return AMT
            const balanceOf = Web3.utils.sha3('balanceOf(address)').slice(0,10);
            await this.mock.givenMethodReturnUint(balanceOf, AMT);
        });
    });

    //////////////////////////////
    //  setRemainderDestination 
    //////////////////////////////
    describe("otherMethod", function () {

    });
});