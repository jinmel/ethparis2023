import { useState, useEffect, useContext, useMemo } from "react";
import { Layout } from "../Layout";
import { AINft } from "../services/models";
import { ClientsContext } from "../contexts/ClientsContext"
import { SelectableImageGrid } from "../components/SelectableImageGrid";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export const Breed = () => {
  const clients = useContext(ClientsContext);
  const [nfts, setNfts] = useState<AINft[]>([]);
  const navigate = useNavigate();

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

  const startMinting = () => {
    navigate("/breed/mint");
  }


  return (
    <Layout>
      <main className="flex flex-col w-full p-4 text-center">
        <h4 className="text-center font-bold">Generated art</h4>
        <p className="text-center text-slate-600">
          Select 2 images for breeding the next generation of children.
        </p>
        <section className="md:px-20 px-4 py-4 mx-auto">
          <SelectableImageGrid
            imgUrls={selectedNfts.map(nft => nft.imageURL)}
            onAllImageSelected={(urls) => console.log(urls)}
            maxSelectable={2}
          />
        </section>

        <section className="md:px-12 px-4 py-4 text-center flex mx-auto gap-8">
          <Button text="Breed new generation" onClick={onBreedClick}/>
          <Button text="Select generation" onClick={startMinting} />
        </section>
      </main>
    </Layout>
  );
};
