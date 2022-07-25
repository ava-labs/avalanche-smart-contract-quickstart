// test/StorageV2.proxy.ts
// Load dependencies
import { expect } from 'chai'
const hre = require("hardhat");

// Start test block
describe('StorageV2 (proxy)', function () {
  beforeEach(async function () {
    const Storage = await hre.ethers.getContractFactory('Storage')
    const StorageV2 = await hre.ethers.getContractFactory('StorageV2')

    this.storage = await hre.upgrades.deployProxy(Storage, [42], {
      initializer: 'store',
    })
    this.storageV2 = await hre.upgrades.upgradeProxy(this.storage.address, StorageV2)
  })

  // Test case
  it('retrieve returns a value previously incremented', async function () {
    // Increment
    await this.storageV2.increment()

    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await this.storageV2.retrieve()).toString()).to.equal('43')
  })
})
