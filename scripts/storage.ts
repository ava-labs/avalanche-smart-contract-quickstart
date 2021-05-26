import { 
  BigNumber,
  Contract
} from "ethers"
import { ethers } from "hardhat"

const contractName: string = "Storage"
const contractAddress: string = "0xE3573540ab8A1C4c754Fd958Dc1db39BBE81b208"

const main = async(): Promise<any> => {
  const contract: Contract = await ethers.getContractAt(contractName, contractAddress)
  const num: BigNumber = await contract.retrieve()
  console.log(`Number: ${num.toString()}`)
  const tx = await contract.store(507)
  console.log(tx)
}

main()