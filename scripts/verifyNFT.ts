import console from "console";
const hre = require("hardhat");

// Define the NFT
const name = "MockNFT";
const symbol = "Mock";
const _metadataUri = "ipfs://QmQ2RFEmZaMds8bRjZCTJxo4DusvcBdLTS6XuDbhp5BZjY";
const _maxTokens = "100";

async function main() {
  await hre.run("verify:verify", {
    address: "0x3972c87769886C4f1Ff3a8b52bc57738E82192D5",
    constructorArguments: [name, symbol, _metadataUri, _maxTokens],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
