import { 
  BigNumber,
  providers,
  utils,
  Wallet
} from "ethers"

const walletAddress: string = "0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57"
const pk: string = "0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027"
const protocol: string = "http"
const host: string = "localhost"
const port: number = 9650

const main = async(): Promise<any> => {
  const provider: providers.JsonRpcProvider = new providers.JsonRpcProvider(`${protocol}://${host}:${port}/ext/bc/C/rpc`)
  const num: number = await provider.getBlockNumber()
  console.log(num)

  const balance: BigNumber = await provider.getBalance(walletAddress)
  console.log(balance)

  const formatted: string = utils.formatEther(balance)
  console.log(formatted)

  const parsed: BigNumber = utils.parseEther("1.0")
  console.log(parsed)

  const wallet: Wallet = new Wallet(pk, provider)
  const tx: providers.TransactionResponse = await wallet.sendTransaction({ 
    to: walletAddress, 
    value: parsed
  });
  console.log(tx)
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})