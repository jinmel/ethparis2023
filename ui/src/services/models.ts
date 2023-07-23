export type AINft = {
  id?: string;
  imageURL: string;
  genome: Array<number>;
};

export type ERC7007Info = {
  name: string;
  imgUrl: string;
  genome: number[];
};

export type OwnedAINFT = {
  id: string;
  owner: string;
  tokenId: string;
};
