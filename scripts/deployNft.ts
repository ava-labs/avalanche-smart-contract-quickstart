import { ethers } from "hardhat"; 


async function deploy(name:string) {
    const contractFactory = await ethers.getContractFactory(name)
    return await contractFactory.deploy().then((f) => f.deployed());
}

async function main() {
    const [ admin ] = await ethers.getSigners()
    console.log('Deploying Contract')

    const mockNft = (await deploy("NFT")).connect(admin);
    
    console.log({ mockNft: mockNft.address})
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });