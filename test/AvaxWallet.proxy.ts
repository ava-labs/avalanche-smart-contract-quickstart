// test/AvaxWallet.proxy.ts
// Load dependencies
import { expect } from 'chai'
const hre = require('hardhat')

// Start test block
describe('AvaxWallet (proxy)', function () {
  beforeEach(async function () {
    const AvaxWallet = await hre.ethers.getContractFactory('AvaxWallet')
    ;[this.owner, this.newOwner] = await hre.ethers.getSigners()
    this.wallet = await hre.upgrades.deployProxy(
      AvaxWallet,
      [this.owner.address],
      { initializer: 'initialize' }
    )
  })

  // Test case
  it('retrieve initialized value', async function () {
    expect((await this.wallet.owner()).toString()).to.equal(this.owner.address)
  })
})
