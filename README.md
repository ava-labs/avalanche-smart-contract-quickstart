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

Hardhat enables deploying to multiple environments. In [`package.json`](./package.json) there is a script for deploying.

```json
"deploy": "npx hardhat run scripts/deploy.js --network mainnet",
```

You can chose which environment that you want to deploy to by passing in the `--network` flag with `avash`, `fuji`, or `mainnet` for each respective environment. If you don't pass in `--network` then it will default to the hardhat network.  For example, if you want to deploy to mainnet

```zsh
yarn deploy --network mainnet
```

When you deploy to `avash`, `fuji` or `mainnet` you can add your private key(s) as an array to the respective environment's `accounts` field in [hardhat.config.js](./hardhat.config.js).

## Hardhat Tasks

You can define custom hardhat tasks in [hardhat.config.js](./hardhat.config.js). There are two tasks included as examples&mdash;`accounts` and `balances` both of which have scripts in [package.json](./package.json).

```json
"accounts": "npx hardhat accounts",
"balances": "npx hardhat balances"
```

`yarn accounts` will print the list of accounts. `yarn balances` prints the list of AVAX account balances. As with other `yarn` scripts you can pass in a `--network` flag to hardhat tasks. For example, to check the balances of the accounts on the `avash` network.


```zsh
yarn balances --network avash
yarn run v1.22.4
$ npx hardhat balances --network avash
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC has balance 0
0x9632a79656af553F58738B0FB750320158495942 has balance 0
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 has balance 0
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 has balance 0
0x0B891dB1901D4875056896f28B6665083935C7A8 has balance 0
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 has balance 0
0x78A23300E04FB5d5D2820E23cc679738982e1fd5 has balance 0
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 has balance 0
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB has balance 0
0x0Fa8EA536Be85F32724D57A37758761B86416123 has balance 0
```

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
