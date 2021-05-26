import {
  BigNumber,
  Contract
} from "ethers"
import { ethers } from "hardhat"

const contractName: string = "Storage"
const contractAddress: string = ""

const main = async (): Promise<any> => {
  const contract: Contract = await ethers.getContractAt(contractName, contractAddress)
  const num: BigNumber = await contract.retrieve()
  console.log(`Number: ${num.toString()}`)
  const tx: any = await contract.store(507)
  console.log(tx)
}

main()