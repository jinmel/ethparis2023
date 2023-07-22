import { NftItem } from "../components/NftItem";
import { AINft } from "../services/models";

export const NftList = ({ nfts }: { nfts: AINft[] }) => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-2 md:content-start md:justify-start justify-center content-center h-full w-full">
      {nfts?.map((nft) => <NftItem key={nft.id} nft={nft} />)}
    </section>
  );
};
