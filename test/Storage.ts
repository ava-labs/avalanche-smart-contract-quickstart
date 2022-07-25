// test/Storage.ts
// Load dependencies
import { expect } from 'chai'
const hre = require('hardhat')

// Start test block
describe('Storage', function () {
  beforeEach(async function () {
    const Storage = await hre.ethers.getContractFactory('Storage')
    this.storage = await Storage.deploy()
    await this.storage.deployed()
  })

  // Test case
  it('retrieve returns a value previously stored', async function () {
    // Store a value
    await this.storage.store(42)
    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await this.storage.retrieve()).toString()).to.equal('42')
  })
})
