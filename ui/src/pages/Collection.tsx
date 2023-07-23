import { Layout } from "../Layout";
import { NftList } from "../components/NftList";
import { useTheGraphNFTQuery } from "../services/graph-client";
import { useAccount } from "wagmi";

export const Collection = () => {
  const { address } = useAccount();
  const { data, loading } = useTheGraphNFTQuery({ address });

  const CollectionView = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (!data || data.length === 0) {
      return <div>You don't have any NFT yet, mint some!</div>;
    }
    return <NftList nfts={data} onNftItemClick={(idx) => console.log(idx)} />;
  };

  return (
    <Layout>
      <div className="p-8">
        <CollectionView />
      </div>
    </Layout>
  );
};
