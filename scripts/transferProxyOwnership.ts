async function transferProxyAdminOwnership() {
  const gnosisSafe = '0x1Ecf23541BC7f891F101A6AF02904f4d6f8F6815'

  console.log('Transferring ownership of ProxyAdmin...')
  // The owner of the ProxyAdmin can upgrade our contracts
  await hre.upgrades.admin.transferProxyAdminOwnership(gnosisSafe)
  console.log('Transferred ownership of ProxyAdmin to:', gnosisSafe)
}

transferProxyAdminOwnership()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
