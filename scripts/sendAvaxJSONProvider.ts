import { utils } from "ethers"
import { ethers } from "hardhat"
interface Param {
  from: string
  to: string 
  value: string
}

const main = async(): Promise<any> => {
  const from: string = "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"
  const to: string = "0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57"
  const amount: string = "0.01"
  const params: Param[] = [{
    from: from,
    to: to,
    value: utils.parseUnits(amount, "ether").toHexString()
  }]
  const tx: any = await ethers.provider.send("eth_sendTransaction", params)
  console.log(tx)
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})