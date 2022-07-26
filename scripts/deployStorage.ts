// scripts/deployStorage.ts
async function deployStorage() {
  const Storage = await hre.ethers.getContractFactory('Storage')
  console.log('Deploying Storage...')
  const storage = await hre.upgrades.deployProxy(Storage, [42], {
    initializer: 'store',
  })
  console.log('Storage deployed to:', storage.address)

  const number = (await storage.retrieve()).toString()
  console.log({ number: number });
}

deployStorage()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
