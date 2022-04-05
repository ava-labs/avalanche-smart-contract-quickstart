import { ethers } from "hardhat";

// Define the NFT
const _nft = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const _nftid = "1";
const _startingBid = "1";

async function deploy(name: string, ...params: [string, string, string]) {
  const contractFactory = await ethers.getContractFactory(name);
  return await contractFactory.deploy(...params).then((f) => f.deployed());
}

async function main() {
  const [admin] = await ethers.getSigners();
  console.log(`Deploying contracts:`);

  const auction = (await deploy("Auction", _nft, _nftid, _startingBid)).connect(
    admin
  );

  console.log({ auction: auction.address });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
