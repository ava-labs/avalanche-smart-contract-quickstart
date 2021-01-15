# Writing Smart Contracts on Avalanche
We'll be building smart contracts with Hardhat. 

## Dependencies
First download the necessary packages.

`yarn`

## Write Contracts
Edit the Coin.sol contract in contracts/ or add your own contracts.


## Building
Make sure your project compiles with `yarn compile`

## Prepare to Deploy
Edit the deployment script in scripts/deploy.js

## Deploy to the hardhat test network

Deploy your contract to the hardhat network with `yarn test-deploy`.

## Deploy to Fuji or Mainnet
You need to add your private key to the accounts field in `hardhat.config.js`

Then run `yarn deploy` for mainnet or `yarn deploy-fuji` for fuji.