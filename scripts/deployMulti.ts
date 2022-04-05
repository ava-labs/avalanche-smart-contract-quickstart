import { ethers } from "hardhat"; 


async function deploy(name:string) {
    const contractFactory = await ethers.getContractFactory(name)
    return await contractFactory.deploy().then((f) => f.deployed());
}

async function main() {
    const [ admin ] = await ethers.getSigners()
    console.log('Deploying Contract')

    const Multicall2 = (await deploy("Multicall2")).connect(admin);
    
    console.log({ Multicall2: Multicall2.address });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });