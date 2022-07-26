import { 
  BigNumber,
  Contract
} from "ethers"
import { ethers } from "hardhat"

const contractName: string = "Storage"
const contractAddress: string = "0x20BC04ad10B6300F542e694f8c3aB44DB8Caac65";

const main = async(): Promise<any> => {
  const contract: Contract = await ethers.getContractAt(contractName, contractAddress)
  const num: BigNumber = await contract.retrieve()
  console.log(`Number: ${num.toString()}`)
  const tx = await contract.retrieve()
  console.log(await ethers.BigNumber.from(tx).toString())
}

main()