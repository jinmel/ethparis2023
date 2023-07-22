import { useState, useEffect, useContext, useMemo } from "react";
import { Layout } from "../Layout";
import { BreedItem } from "../components/BreedItem";
import { NftList } from "../components/NftList";
import { AINft } from "../services/models";
import { ClientsContext } from "../contexts/ClientsContext"

export const Breed = () => {
  const clients = useContext(ClientsContext);
  const [nfts, setNfts] = useState<AINft[]>([]);

  useEffect(()=> {
    clients.apiClient.getSeed(25).then((response) => {
      const nfts = response.map(elem => {
        return {imageURL: elem.image, genome: elem.genome};
      });
      setNfts(nfts);
    });
  });

  const [selectedParents, setSelectedParent] = useState<Array<number>>([]);

  const selectedNfts = useMemo(() => {
    return selectedParents.map((index) => nfts[index]);
  }, [selectedParents, nfts]);

  const onNftItemClick = (index: number) => {
    setSelectedParent((prev) => {
      if (prev.includes(index)) {
        return prev.filter((item) => item !== index);
      } else {
        return [...prev, index];
      }
    });
  }

  const onBreedClick = () => {
    console.log(selectedParents);
  };

  const onMintClick = () => {
    console.log(selectedParents);
  }

  return (
    <Layout>
      <section>
        <BreedItem
          selectedNfts={selectedNfts}
          onBreedClick={onBreedClick}
          onMintClick={onMintClick}
          onNftItemClick={onNftItemClick}
        />
      </section>

      <section className="flex flex-col w-full p-4">
        <h4 className="font-bold text-center md:text-left"></h4>
        <hr />
        <div className="py-4">
          <NftList nfts={nfts} onNftItemClick={onNftItemClick}/>
        </div>
      </section>
    </Layout>
  );
};
