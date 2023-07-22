import { useState } from "react";
import { Layout } from "../Layout";
import { BreedItem } from "../components/BreedItem";
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

export const Breed = () => {
  const [selectedParents, setSelectedParent] = useState<{
    item1: AINft | undefined;
    item2: AINft | undefined;
  }>();
  const onSelectedItemChange = (
    item1: AINft | undefined,
    item2: AINft | undefined,
  ) => {
    setSelectedParent((prev) => ({
      item1: item1 ?? prev?.item1,
      item2: item2 ?? prev?.item2,
    }));
  };

  const onBreed = () => {
    console.log(selectedParents);
  };

  return (
    <Layout>
      <section>
        <BreedItem
          item1={nfts[0]}
          item2={nfts[1]}
          onSelectedItemChange={onSelectedItemChange}
          onBreedClicked={onBreed}
        />
      </section>

      <section className="flex flex-col w-full p-4">
        <h4 className="font-bold text-center md:text-left"></h4>
        <hr />
        <div className="py-4">
          <NftList nfts={nfts} />
        </div>
      </section>
    </Layout>
  );
};
