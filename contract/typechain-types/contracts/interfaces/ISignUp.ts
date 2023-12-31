/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export type WorldIDVerificationStruct = {
  root: PromiseOrValue<BigNumberish>;
  group: PromiseOrValue<BigNumberish>;
  signal: PromiseOrValue<string>;
  nullifierHash: PromiseOrValue<BigNumberish>;
  appID: PromiseOrValue<string>;
  actionID: PromiseOrValue<string>;
  proof: PromiseOrValue<BigNumberish>[];
};

export type WorldIDVerificationStructOutput = [
  BigNumber,
  BigNumber,
  string,
  BigNumber,
  string,
  string,
  BigNumber[]
] & {
  root: BigNumber;
  group: BigNumber;
  signal: string;
  nullifierHash: BigNumber;
  appID: string;
  actionID: string;
  proof: BigNumber[];
};

export interface ISignUpInterface extends utils.Interface {
  functions: {
    "verify((uint256,uint256,string,uint256,string,string,uint256[8]))": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "verify"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "verify",
    values: [WorldIDVerificationStruct]
  ): string;

  decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;

  events: {};
}

export interface ISignUp extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISignUpInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    verify(
      worldIDVerification: WorldIDVerificationStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  verify(
    worldIDVerification: WorldIDVerificationStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    verify(
      worldIDVerification: WorldIDVerificationStruct,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    verify(
      worldIDVerification: WorldIDVerificationStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    verify(
      worldIDVerification: WorldIDVerificationStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
