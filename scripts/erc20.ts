import { 
    BigNumber,
    Contract, 
    ContractFactory
} from "ethers"
import { ethers } from "hardhat"
import { ContractType } from "hardhat/internal/hardhat-network/stack-traces/model"

const coinName: string = "AVASHStable"
const coinAddr: string = "0x5aa01B3b5877255cE50cc55e8986a7a5fe29C70e"
const walletAddress: string = "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"

const main = async(): Promise<any> => {
  const contract: Contract = await ethers.getContractAt(coinName, coinAddr)
  const contractAddress: string = contract.address 
  console.log(`Address: ${contractAddress}`)

  const name: string = await contract.name() 
  console.log(`Name: ${name}`)

  const symbol: string = await contract.symbol() 
  console.log(`Symbol: ${symbol}`)

  const decimals: string = await contract.decimals() 
  console.log(`Decimals: ${decimals}`)

  const balance: BigNumber = await contract.balanceOf(walletAddress)
  console.log(`Balance of ${walletAddress}: ${balance.toString()}`)

  let totalSupply: BigNumber = await contract.totalSupply()
  console.log(`Total supply: ${totalSupply.toString()}`)

  console.log(`-----MINTING-----`)
  await contract.mint(walletAddress, totalSupply)

  totalSupply = await contract.totalSupply()
  console.log(`Total supply: ${totalSupply.toString()}`)

  console.log(`-----BURNING-----`)
  await contract.burn(walletAddress, totalSupply)

  totalSupply = await contract.totalSupply()
  console.log(`Total supply: ${totalSupply.toString()}`)

  const tx = await contract.transfer(walletAddress, balance)
  console.log("--TX--")
  console.log(tx)

  const txReceipt = await tx.wait()
  console.log("--TX RECEIPT--")
  console.log(txReceipt)
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})