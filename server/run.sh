#!/bin/sh

set -ex

echo "Training model."

python3.10 train.py --output_dir ./assets

read -p "Contiunue creating verifier?" -n 1 -r

echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    [[ "$0" = "$BASH_SOURCE" ]] && exit 1 || return 1 # handle exits from shell or function but don't exit interactive shell
fi

cd ./assets
echo "Starting to generate verifier contract"

# # gen settings
ezkl gen-settings -M model.onnx

# calibrate settings
ezkl calibrate-settings -M model.onnx -D input.json --target resources

# gen srs
ezkl get-srs --settings-path=settings.json

# setup
ezkl setup -M model.onnx --srs-path=kzg.srs --vk-path=vk.key --pk-path=pk.key --settings-path=settings.json

### Verifying local
echo "Starting to verify locally"

# gen witness
echo "Generating witness"
ezkl gen-witness -M model.onnx -D input.json  --settings-path=settings.json

# gen proof
echo "Generating proof"
ezkl prove -M model.onnx --witness=witness.json --pk-path=pk.key --proof-path=model.proof --srs-path=kzg.srs --settings-path=settings.json

# verify
echo "Verifying proof"
ezkl verify --proof-path=model.proof --settings-path=settings.json --vk-path=vk.key --srs-path=kzg.srs

### Verifying On-Chain
echo "Starting to verify on-chain"

# gen evm verifier
echo "Generating EVM verifier"
ezkl create-evm-verifier --srs-path=kzg.srs --vk-path=vk.key --sol-code-path=verif.sol --settings-path=settings.json

# gen witness
echo "Generating witness"
ezkl gen-witness -D input.json -M model.onnx --settings-path=settings.json

# gen proof
echo "Generating proof"
ezkl prove --transcript=evm --witness=witness.json -M model.onnx --proof-path=model.pf --pk-path=pk.key --srs-path=kzg.srs --settings-path=settings.json 

# install anvil if you haven't already
cargo install --git https://github.com/foundry-rs/foundry --profile local --locked foundry-cli anvil

# spin up a local EVM through anvil 
anvil -p 3030

### NOTE: Execute following commands in a new terminal window.

# deploy evm verifier
echo "Deploying EVM verifier"
ezkl deploy-evm-verifier --addr-path=addr.txt --rpc-url=http://127.0.0.1:3030 --sol-code-path verif.sol 

# verify (EVM), make sure to copy the address stored in addr.txt and paste it into the addr param
echo "Verifying proof on-chain"
ezkl verify-evm --proof-path model.pf --addr=0x5fbdb2315678afecb367f032d93f642f64180aa3 --rpc-url=http://127.0.0.1:3030