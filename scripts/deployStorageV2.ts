async function deployStorageV2() {
  const Storagev2 = await hre.ethers.getContractFactory('StorageV2')
  console.log('Deploying Storage2...')
  const storage = await Storagev2.deploy()
  console.log('StorageV2 deployed to:', storage.address)
}

deployStorageV2()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });