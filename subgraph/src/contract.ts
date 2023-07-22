import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Mint as MintEvent,
  Transfer as TransferEvent,
} from "../generated/Contract/Contract";
import {
  Approval,
  ApprovalForAll,
  Mint,
  TokenOwner,
  Transfer,
} from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts";

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.approved = event.params.approved;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMint(event: MintEvent): void {
  let entity = new Mint(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenId = event.params.tokenId;
  entity.prompt = event.params.prompt;
  entity.aigcData = event.params.aigcData;
  entity.uri = event.params.uri;
  entity.proof = event.params.proof;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // update latest owner
  const tokenIdBytes = Bytes.fromByteArray(
    Bytes.fromBigInt(event.params.tokenId)
  );
  let token = new TokenOwner(tokenIdBytes);
  token.tokenId = event.params.tokenId;
  token.owner = event.params.to;
  token.save();
}
