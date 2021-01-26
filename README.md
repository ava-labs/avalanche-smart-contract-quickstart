# Writing Smart Contracts on Avalanche

## Introduction

Avalanche is an open-source platform for launching decentralized applications and enterprise blockchain deployments in one interoperable, highly scalable ecosystem. Avalanche gives you complete control on both the network and application layers&mdash;helping you build anything you can imagine.

Avalanche can do anything a typical Ethereum client can by using the Ethereum-standard RPC calls. The immediate benefits of using the Avalanche rather than Ethereum are speed, scale and throughput. Avalanche offers thousands of transactions per second with sub-second finality at inexpensive fees. These properties will considerably improve the performance of DApps and the user experience of smart-contracts.

The goal of this guide is to lay out a best-practices regarding writing, testing and deploying smart-contracts to Avalanche. We'll be building smart contracts with [Hardhat](https://hardhat.org) which is an Avalanche development environment for professionals.

## Prerequisites

First install the LTS of [nodejs](https://nodejs.org/en) which is `14.15.4` at the time of writing. NodeJS bundles `npm`. Next install [yarn](https://yarnpkg.com)

It is also helpful to have a basic understanding of [Solidity](https://docs.soliditylang.org) and [Avalanche](https://docs.avax.network).

## Dependencies

First clone this repo and download the necessary packages.

```zsh
git clone https://github.com/ava-labs/smart-contract-quickstart.git
cd smart-contract-quickstart
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

## Deploy to the hardhat test network

In [`package.json`](./package.json) there are scripts for deploying to [avash](https://github.com/ava-labs/avash), `fuji` and `mainnet`.

```json
"test-deploy": "npx hardhat run scripts/deploy.js",
"deploy": "npx hardhat run scripts/deploy.js --network mainnet",
"deploy-fuji": "npx hardhat run scripts/deploy.js --network fuji",
```

Deploy your contract to the hardhat network with `yarn test-deploy`.

## Deploy to Fuji or Mainnet

You need to add your private key to the accounts field in [hardhat.config.js](./hardhat.config.js).

Then run `yarn deploy` for mainnet or `yarn deploy-fuji` for fuji.

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

You can run `yarn hardhat` list hardhat version, usage instructions, global options and available tasks.
