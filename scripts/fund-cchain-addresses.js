'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const avalanche_1 = require('avalanche');
const avm_1 = require('avalanche/dist/apis/avm');
const evm_1 = require('avalanche/dist/apis/evm');
const utils_1 = require('avalanche/dist/utils');
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const ip = 'localhost';
const port = 9650;
const protocol = 'http';
const networkID = 12345;
const avalanche = new avalanche_1.Avalanche(ip, port, protocol, networkID);
const mstimeout = 3000;
const xchain = avalanche.XChain();
const cchain = avalanche.CChain();
const bintools = avalanche_1.BinTools.getInstance();
const xKeychain = xchain.keyChain();
const cKeychain = cchain.keyChain();
const privKeys = [
  'PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN',
  'PrivateKey-wHR4zmr9am94KVYnV2aRR4QXt78cuGebt1GpYNwJYEbfAGonj',
  'PrivateKey-AR874kuHtHpDk7ntffuEQ9cwiQLL2dz1DmJankW1EyXnz5fc7',
  'PrivateKey-Ntk8vV7zaWzAot2wuDXK4e9ZGFUnU49AYTDew5XUyYaNz2u9d',
  'PrivateKey-oLM8XbXxXmBHVbdKm2tRYQ1WdMj3b2NggftQpvDUXWSMtdY4i',
  'PrivateKey-2kjfDc9RVUQJnu3HQDGiVdxvhM9BmR3UTx7Aq8AJ82G2MspATy',
  'PrivateKey-2Rh5Gtu28ca7PS6rLfN6uou9ext8Y5xhoAJDdWPU7GESBLHtv6',
  'PrivateKey-2ZcbEPKkXjswsNRBGViGzruReAtTAxW9hsGeMc2GgppnJnDgne',
  'PrivateKey-22SYvqaRgFtPJfiZmswrCyE57UcssLVnNPDJ48PYAiCjKVAGy7',
  'PrivateKey-tYRsRPijLo6KD2azMLzkcB2ZUndU3a2dJ8kEqBtqesa85pWhB'
];
privKeys.forEach((privKey) => {
  xKeychain.importKey(privKey);
  cKeychain.importKey(privKey);
});
const xAddresses = xchain.keyChain().getAddresses();
const xAddressStrings = xchain.keyChain().getAddressStrings();
const cAddressStrings = cchain.keyChain().getAddressStrings();
const cAddresses = cchain.keyChain().getAddresses();
const cHexAddresses = [
  '0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC',
  '0x9632a79656af553f58738b0fb750320158495942',
  '0x55ee05df718f1a5c1441e76190eb1a19ee2c9430',
  '0x4cf2ed3665f6bfa95ce6a11cfdb7a2ef5fc1c7e4',
  '0x0b891db1901d4875056896f28b6665083935c7a8',
  '0x01f253be2ebf0bd64649fa468bf7b95ca933bde2',
  '0x78A23300E04FB5d5D2820E23cc679738982e1fd5',
  '0x3c7dae394bbf8e9ee1359ad14c1c47003bd06293',
  '0x61e0b3cd93f36847abbd5d40d6f00a8ec6f3cffb',
  '0x0fa8ea536be85f32724d57a37758761b86416123'
];
const cChainBlockchainID = utils_1.Defaults.network['12345'].C.blockchainID;
const cChainBlockchainIdBuf = bintools.cb58Decode(cChainBlockchainID);
const xChainBlockchainID = utils_1.Defaults.network['12345'].X.blockchainID;
const xChainBlockchainIdBuf = bintools.cb58Decode(xChainBlockchainID);
const exportedOuts = [];
const outputs = [];
const inputs = [];
const importedIns = [];
const evmOutputs = [];
const fee = xchain.getDefaultTxFee();
const locktime = new avalanche_1.BN(0);
const threshold = 1;
const memo = bintools.stringToBuffer(
  'AVM utility method buildExportTx to export AVAX to the C-Chain from the X-Chain'
);

const waitForUtxo = async () => {
  const u = await cchain.getUTXOs(cAddressStrings[0], 'X');

  if (u.utxos.getAllUTXOs().length) {
    return u.utxos.getAllUTXOs();
  } else {
    await sleep(mstimeout);
    return waitForUtxo();
  }
};

const main = async () => {
  const avaxAssetID = await xchain.getAVAXAssetID();
  const getBalanceResponse = await xchain.getBalance(
    xAddressStrings[0],
    bintools.cb58Encode(avaxAssetID)
  );
  const balance = new avalanche_1.BN(getBalanceResponse.balance);
  const avmUTXOResponse = await xchain.getUTXOs(xAddressStrings);
  const avmUTXOSet = avmUTXOResponse.utxos;
  const avmUTXOs = avmUTXOSet.getAllUTXOs();
  // 1,000 AVAX
  const amount = new avalanche_1.BN(1000000000000);
  console.log('Exporting 1000 AVAX to each address on the C-Chain...');
  let secpTransferOutput = new avm_1.SECPTransferOutput(
    amount.mul(new avalanche_1.BN(10)),
    [cAddresses[0]],
    locktime,
    threshold
  );
  let transferableOutput = new avm_1.TransferableOutput(
    avaxAssetID,
    secpTransferOutput
  );
  exportedOuts.push(transferableOutput);
  secpTransferOutput = new avm_1.SECPTransferOutput(
    balance.sub(amount.mul(new avalanche_1.BN(10))).sub(fee),
    xAddresses,
    locktime,
    threshold
  );
  transferableOutput = new avm_1.TransferableOutput(
    avaxAssetID,
    secpTransferOutput
  );
  outputs.push(transferableOutput);
  avmUTXOs.forEach((utxo) => {
    const amountOutput = utxo.getOutput();
    const amt = amountOutput.getAmount().clone();
    const txid = utxo.getTxID();
    const outputidx = utxo.getOutputIdx();
    const secpTransferInput = new avm_1.SECPTransferInput(amt);
    secpTransferInput.addSignatureIdx(0, xAddresses[0]);
    const input = new avm_1.TransferableInput(
      txid,
      outputidx,
      avaxAssetID,
      secpTransferInput
    );
    inputs.push(input);
  });

  const exportTx = new avm_1.ExportTx(
    networkID,
    bintools.cb58Decode(xChainBlockchainID),
    outputs,
    inputs,
    memo,
    bintools.cb58Decode(cChainBlockchainID),
    exportedOuts
  );
  const avmUnsignedTx = new avm_1.UnsignedTx(exportTx);
  const avmTx = avmUnsignedTx.sign(xKeychain);
  const avmTXID = await xchain.issueTx(avmTx);
  console.log(avmTXID);
  await sleep(mstimeout);
  console.log('Importing AVAX to the C-Chain...');
  console.log('Please wait');
  const utxos = await waitForUtxo();

  utxos.forEach((utxo, index) => {
    const assetID = utxo.getAssetID();
    const txid = utxo.getTxID();
    const outputidx = utxo.getOutputIdx();
    const output = utxo.getOutput();
    const amt = output.getAmount().clone();
    const input = new evm_1.SECPTransferInput(amt);
    input.addSignatureIdx(0, cAddresses[0]);
    const xferin = new evm_1.TransferableInput(txid, outputidx, assetID, input);
    importedIns.push(xferin);

    cHexAddresses.forEach((cHexAddress) => {
      const evmOutput = new evm_1.EVMOutput(
        cHexAddress,
        new avalanche_1.BN(1000000000),
        assetID
      );
      evmOutputs.push(evmOutput);
    });
  });

  const importTx = new evm_1.ImportTx(
    networkID,
    cChainBlockchainIdBuf,
    xChainBlockchainIdBuf,
    importedIns,
    evmOutputs
  );
  const evmUnsignedTx = new evm_1.UnsignedTx(importTx);

  const evmTx = evmUnsignedTx.sign(cKeychain);
  const evmTXID = await cchain.issueTx(evmTx);
  console.log(evmTXID);
};
main();
