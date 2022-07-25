async function transferProxyAdminOwnership() {
  const gnosisSafe = "0xCA2922E98339C359D818b8f7ad3c897C0e18a7ff";

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
