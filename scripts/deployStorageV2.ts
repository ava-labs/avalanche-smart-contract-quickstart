async function deployStorageV2() {
  const Storagev2 = await hre.ethers.getContractFactory('StorageV2')
  console.log('Deploying Storage2...')
  const storage = await hre.upgrades.deployProxy(Storagev2, [43], {
    initializer: 'store',
  })
  console.log('Storage2 deployed to:', storage.address)
  const number = (await storage.retrieve()).toString()
  console.log({ storeValue: number })
}

deployStorageV2()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });