import { NftItem } from "../components/NftItem";
import { OwnedAINFT } from "../services/models";

interface NftListProps {
  nfts: OwnedAINFT[];
  onNftItemClick: (index: number) => void;
}

export const NftList = ({ nfts, onNftItemClick }: NftListProps) => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-2 md:content-start md:justify-start justify-center content-center h-full w-full">
      {nfts?.map((nft, index) => (
        <NftItem key={index} nft={nft} onClick={() => onNftItemClick(index)} />
      ))}
    </section>
  );
};
