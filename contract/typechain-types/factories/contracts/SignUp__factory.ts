/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { SignUp, SignUpInterface } from "../../contracts/SignUp";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_worldIDRouter",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "root",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "group",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "signal",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "nullifierHash",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "appID",
            type: "string",
          },
          {
            internalType: "string",
            name: "actionID",
            type: "string",
          },
          {
            internalType: "uint256[8]",
            name: "proof",
            type: "uint256[8]",
          },
        ],
        internalType: "struct WorldIDVerification",
        name: "verif",
        type: "tuple",
      },
    ],
    name: "verify",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "worldIDRouter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a060405234801561000f575f80fd5b5060405161047238038061047283398101604081905261002e9161003f565b6001600160a01b031660805261006c565b5f6020828403121561004f575f80fd5b81516001600160a01b0381168114610065575f80fd5b9392505050565b6080516103e861008a5f395f81816065015261015c01526103e85ff3fe608060405234801561000f575f80fd5b5060043610610034575f3560e01c8063e0e38eb814610038578063e31e250514610060575b5f80fd5b61004b61004636600461029e565b6100ac565b60405190151581526020015b60405180910390f35b6100877f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610057565b5f806100e36100be60408501856102dd565b6040516020016100cf929190610327565b60405160208183030381529060405261026a565b90505f6100f66100be60808601866102dd565b90505f61011c8261010a60a08801886102dd565b6040516020016100cf93929190610336565b6040517f3bc778e300000000000000000000000000000000000000000000000000000000815290915073ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001690633bc778e3906101a79088359060208a013590889060608c013590889060c08e019060040161034f565b5f604051808303815f87803b1580156101be575f80fd5b505af19250505080156101cf575060015b61025f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f5369676e55703a20696e76616c696420576f726c64494456657269666963617460448201527f696f6e0000000000000000000000000000000000000000000000000000000000606482015260840160405180910390fd5b506001949350505050565b5f60088260405160200161027e9190610386565b60408051601f198184030181529190528051602090910120901c92915050565b5f602082840312156102ae575f80fd5b813567ffffffffffffffff8111156102c4575f80fd5b82016101c081850312156102d6575f80fd5b9392505050565b5f808335601e198436030181126102f2575f80fd5b83018035915067ffffffffffffffff82111561030c575f80fd5b602001915036819003821315610320575f80fd5b9250929050565b818382375f9101908152919050565b838152818360208301375f910160200190815292915050565b5f6101a0820190508782528660208301528560408301528460608301528360808301526101008360a0840137979650505050505050565b5f82515f5b818110156103a5576020818601810151858301520161038b565b505f92019182525091905056fea2646970667358221220bab29b6093b399264eb7c5133eaf8d4a72f6255137ec5bc6aa849da40d24eeff64736f6c63430008140033";

type SignUpConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SignUpConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SignUp__factory extends ContractFactory {
  constructor(...args: SignUpConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _worldIDRouter: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SignUp> {
    return super.deploy(_worldIDRouter, overrides || {}) as Promise<SignUp>;
  }
  override getDeployTransaction(
    _worldIDRouter: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_worldIDRouter, overrides || {});
  }
  override attach(address: string): SignUp {
    return super.attach(address) as SignUp;
  }
  override connect(signer: Signer): SignUp__factory {
    return super.connect(signer) as SignUp__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SignUpInterface {
    return new utils.Interface(_abi) as SignUpInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): SignUp {
    return new Contract(address, _abi, signerOrProvider) as SignUp;
  }
}
