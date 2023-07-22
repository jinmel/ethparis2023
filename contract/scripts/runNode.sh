#! /bin/sh

npx hardhat node --fork https://rpc.ankr.com/eth --fork-block-number 17749850

npx hardhat run ./scripts/deployLocalMainnet.ts --network localhost