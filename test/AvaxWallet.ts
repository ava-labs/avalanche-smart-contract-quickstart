// test/AvaxWallet.ts
// Load dependencies
import { expect } from 'chai'
const hre = require('hardhat')

// Start test block
describe('AvaxWallet', function () {
  beforeEach(async function () {
    ;[this.owner, this.newOwner] = await hre.ethers.getSigners()

    const AvaxWallet = await hre.ethers.getContractFactory('AvaxWallet')
    this.wallet = await AvaxWallet.deploy()
    await this.wallet.deployed()

    await this.wallet.initialize(this.owner.address)
    expect(await this.wallet.initialized()).to.equal(true)
  })

  // Test case
  it('Change owner to new address', async function () {
    await this.wallet.changeOwner(this.newOwner.address)
    expect((await this.wallet.getOwner()).toString()).to.equal(
      this.newOwner.address
    )
  })
  it('Deposit and withdraw Avax', async function () {
    await this.wallet.deposit(hre.ethers.utils.parseEther('5000.0'), {
      value: hre.ethers.utils.parseEther('5000.0'),
    })
    expect((await this.wallet.getBalance()).toString()).to.equal(
      hre.ethers.utils.parseEther('5000.0').toString()
    )
    await this.wallet.withdraw(hre.ethers.utils.parseEther('5000.0'))
    expect((await this.wallet.getBalance()).toString()).to.equal(
      hre.ethers.utils.parseEther('0').toString()
    )
  })
})
