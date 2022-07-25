// test/StorageV2.ts
// Load dependencies
import { expect } from 'chai'
const hre = require('hardhat')

// Start test block
describe('StorageV2', function () {
  beforeEach(async function () {
    const StorageV2 = await hre.ethers.getContractFactory('StorageV2')
    this.storageV2 = await StorageV2.deploy()
    await this.storageV2.deployed()
  })

  // Test case
  it('retrieve returns a value previously stored', async function () {
    // Store a value
    await this.storageV2.store(42)

    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await this.storageV2.retrieve()).toString()).to.equal('42')
  })

  // Test case
  it('retrieve returns a value previously incremented', async function () {
    // Increment
    await this.storageV2.increment()

    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await this.storageV2.retrieve()).toString()).to.equal('1')
  })
})
