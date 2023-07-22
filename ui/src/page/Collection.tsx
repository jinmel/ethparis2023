import { Layout } from "../Layout";
import { NftList } from "../components/NftList";
import { AINft } from "../services/models";

const nfts: AINft[] = [
  {
    id: "122",
    imageURL:
      "https://images.unsplash.com/photo-1545231097-cbd796f1d95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2190&q=80",
  },
  {
    id: "123",
    imageURL:
      "https://images.unsplash.com/photo-1545231097-cbd796f1d95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2190&q=80",
  },
  {
    id: "123",
    imageURL:
      "https://images.unsplash.com/photo-1545231097-cbd796f1d95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2190&q=80",
  },
  {
    id: "123",
    imageURL:
      "https://images.unsplash.com/photo-1545231097-cbd796f1d95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2190&q=80",
  },
  {
    id: "123",
    imageURL:
      "https://images.unsplash.com/photo-1545231097-cbd796f1d95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2190&q=80",
  },
];

export const Collection = () => {
  return (
    <Layout>
      <div className="p-8">
        <NftList nfts={nfts} />
      </div>
    </Layout>
  );
};
