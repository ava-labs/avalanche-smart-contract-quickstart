import { 
    BigNumber,
    Contract 
} from "ethers"
import { ethers } from "hardhat"

const coinName: string = "CustomCoin"
const coinAddr: string = "0x52C84043CD9c865236f11d9Fc9F56aa003c1f922"
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

  const totalSupply: BigNumber = await contract.totalSupply()
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