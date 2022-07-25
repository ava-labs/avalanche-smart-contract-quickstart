// test/Storage.proxy.ts
// Load dependencies
import { expect } from 'chai'
const hre = require('hardhat')

// Start test block
describe('Storage (proxy)', function () {
  beforeEach(async function () {
    const Storage = await hre.ethers.getContractFactory('Storage')
    this.storage = await hre.upgrades.deployProxy(Storage, [42], {
      initializer: 'store',
    })
  })

  // Test case
  it('retrieve returns a value previously initialized', async function () {
    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await this.storage.retrieve()).toString()).to.equal('42')
  })
})
