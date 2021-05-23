import { Contract } from "ethers"
import { ethers } from "hardhat"

const coinName: string = "Storage"
const coinAddr: string = "0xE3573540ab8A1C4c754Fd958Dc1db39BBE81b208"

const main = async(): Promise<any> => {
  const contract: Contract = await ethers.getContractAt(coinName, coinAddr)
  const contractAddress: string = contract.address 
  console.log(`Address: ${contractAddress}`)

  let val: string = await contract.retrieve() 
  console.log(`Val: ${val}`)

  const store: string = await contract.store(507) 
  console.log(store)
}

main()
