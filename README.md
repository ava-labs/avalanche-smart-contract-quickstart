# Writing Smart Contracts on Avalanche

## Introduction

Avalanche is an open-source platform for launching decentralized applications and enterprise blockchain deployments in one interoperable, highly scalable ecosystem. Avalanche gives you complete control on both the network and application layers&mdash;helping you build anything you can imagine.

Avalanche can do anything a typical Ethereum client can by using the Ethereum-standard RPC calls. The immediate benefits of using Avalanche rather than Ethereum are speed, scale and throughput. Avalanche offers thousands of transactions per second with sub-second finality at inexpensive fees. These properties will considerably improve the performance of DApps and the user experience of smart-contracts.

The goal of this guide is to lay out a best-practices regarding writing, testing and deploying smart-contracts to Avalanche. We'll be building smart contracts with [Hardhat](https://hardhat.org) which is an Avalanche development environment for professionals.

## Prerequisites

### NodeJS and Yarn

First install the LTS of [nodejs](https://nodejs.org/en) which is `14.15.4` at the time of writing. NodeJS bundles `npm`.

Next install [yarn](https://yarnpkg.com):

```zsh
npm install -g yarn
```

### AvalancheGo and Avash

[AvalancheGo](https://github.com/ava-labs/avalanchego) is our full node written in Golang. [Avash](https://docs.avax.network/build/tools/avash) is our local test network. Together, you can deploy private local networks and run tests on them.

### Solidity and Avalanche

It is also helpful to have a basic understanding of [Solidity](https://docs.soliditylang.org) and [Avalanche](https://docs.avax.network).

## Dependencies

First clone this repo and download the necessary packages.

```zsh
git clone https://github.com/ava-labs/avalanche-smart-contract-quickstart.git
cd avalanche-smart-contract-quickstart
yarn
```

## Write Contracts

Edit the `Coin.sol` contract in `contracts/`. `Coin.sol` is an [Open Zeppelin](https://openzeppelin.com) [ERC20](https://eips.ethereum.org/EIPS/eip-20) contract. ERC20 is a popular smart contract interface for interoperability. You can also add your own contracts.

## Building

In [`package.json`](./package.json) there's a `compile` script.

```json
"compile": "npx hardhat compile",
```

Run `yarn compile` to make sure your project compiles.

## Prepare to Deploy

Edit the deployment script in `scripts/deploy.js`

## Deploy

Hardhat enables deploying to multiple environments. In [`package.json`](./package.json) there are scripts for deploying to the [hardhat network](https://hardhat.org/hardhat-network), [avash](https://github.com/ava-labs/avash), `fuji` and `mainnet`.

```json
"deploy-hardhat-network": "npx hardhat run scripts/deploy.js",
"deploy-avash": "npx hardhat run scripts/deploy.js --network avash",
"deploy-fuji": "npx hardhat run scripts/deploy.js --network fuji",
"deploy": "npx hardhat run scripts/deploy.js --network mainnet",
```

Deploy your contract to the Avalanche `fuji` testnet with `yarn deploy-fuji`.

To deploy to avash, `fuji` or `mainnet` you need to add your private key(s) to the `accounts` field in [hardhat.config.js](./hardhat.config.js).

Then run `yarn deploy` for mainnet, `yarn deploy-fuji` for fuji, `yarn deploy-avash` for avash and `yarn deploy-hardhat-network` for the hardhat network.

## Hardhat Tasks

You can define custom hardhat tasks in [hardhat.config.js](./hardhat.config.js). There are two tasks included as examples&mdash;`accounts` and `balances` both of which have scripts in [package.json](./package.json).

```json
"accounts": "npx hardhat accounts",
"balances": "npx hardhat balances"
```

`yarn accounts` will print the list of accounts. `yarn balances` prints the list of AVAX account balances.

## Sending AVAX

[package.json](./package.json) has a `send-avax` script which is found in [scripts/sendAvax.js](./scripts/sendAvax.js).

```json
"send-avax": "npx hardhat run scripts/sendAvax.js",
```

Run it with `yarn send-avax`.

## Hardhat Help

You can run `yarn hardhat` to list hardhat version, usage instructions, global options and available tasks.

## Typical avash workflow

First confirm you have the latest and greatest AvalancheGo built.

```zsh
cd /path/to/avalanchego
git fetch -p
git checkout master
./scripts/build.sh
```

Next fire up avash and run a script to configure your network.

```zsh
cd /path/to/avash
git fetch -p
git checkout master
go build
 ./avash
Config file set: /Users/username/.avash.yaml
Avash successfully configured.
avash> runscript scripts/five_node_staking.lua
RunScript: Running scripts/five_node_staking.lua
RunScript: Successfully ran scripts/five_node_staking.lua
```

Now you have a local avalanche network with 5 staking nodes. Next transfer 1000 AVAX from the X-Chain to each of the 10 avash accounts in `hardhat.config.js`.

```zsh
cd /path/to/avalanche-smart-contract-quickstart
yarn fund-cchain-addresses
yarn run v1.22.4
$ npx hardhat run scripts/fund-cchain-addresses.js --network avash
Exporting 1000 AVAX to each address on the C-Chain...
2b75ae74ScLkWe5GVFTYJoP2EniMywkcZySQUoFGN2EJLiPDgp
Importing AVAX to the C-Chain...
2dyXcQGiCk1ckCX4Fs8nLgL8GJgsM72f9Ga13rX5v9TAguVJYM
✨  Done in 5.03s.
```

Confirm each of the accounts are funded with 1000 AVAX.

```zsh
yarn balances
yarn run v1.22.4
$ npx hardhat balances
0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has balance 10000000000000000000000
0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has balance 10000000000000000000000
0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has balance 10000000000000000000000
0x90F79bf6EB2c4f870365E785982E1f101E93b906 has balance 10000000000000000000000
0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has balance 10000000000000000000000
0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc has balance 10000000000000000000000
0x976EA74026E726554dB657fA54763abd0C3a0aa9 has balance 10000000000000000000000
0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 has balance 10000000000000000000000
0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f has balance 10000000000000000000000
0xa0Ee7A142d267C1f36714E4a8F75612F20a79720 has balance 10000000000000000000000
0xBcd4042DE499D14e55001CcbB24a551F3b954096 has balance 10000000000000000000000
0x71bE63f3384f5fb98995898A86B02Fb2426c5788 has balance 10000000000000000000000
0xFABB0ac9d68B0B445fB7357272Ff202C5651694a has balance 10000000000000000000000
0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec has balance 10000000000000000000000
0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097 has balance 10000000000000000000000
0xcd3B766CCDd6AE721141F452C550Ca635964ce71 has balance 10000000000000000000000
0x2546BcD3c84621e976D8185a91A922aE77ECEc30 has balance 10000000000000000000000
0xbDA5747bFD65F08deb54cb465eB87D40e51B197E has balance 10000000000000000000000
0xdD2FD4581271e230360230F9337D5c0430Bf44C0 has balance 10000000000000000000000
0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199 has balance 10000000000000000000000
```
