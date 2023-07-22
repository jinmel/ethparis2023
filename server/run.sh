#!/bin/sh

set -ex

echo "Training model."

python train.py --output_dir ./assets

read -p "Contiunue creating verifier?" -n 1 -r

echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    [[ "$0" = "$BASH_SOURCE" ]] && exit 1 || return 1 # handle exits from shell or function but don't exit interactive shell
fi

cd ./assets
echo "Starting to generate verifier contract"

ezkl setup -D input.json -M model.onnx --params-path=kzg.params --vk-path=vk.key --pk-path=pk.key --circuit-params-path=circuit.params -B 19 -K 20

# gen proof
ezkl prove --transcript=evm -M model.onnx -D input.json --proof-path model.pf --pk-path pk.key --params-path=kzg.params --circuit-params-path=circuit.params

# gen evm verifier
ezkl create-evm-verifier --deployment-code-path model.code --params-path=kzg.params --vk-path vk.key --sol-code-path verifier.sol --circuit-params-path=circuit.params

# Verify (EVM)
ezkl verify-evm --proof-path model.pf --deployment-code-path model.code

echo "Verifier solidity code at verifier.sol"
