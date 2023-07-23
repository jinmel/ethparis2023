import { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { Layout } from "../Layout";
import { AINft } from "../services/models";
import { ClientsContext } from "../contexts/ClientsContext";
import { SelectableImageGrid } from "../components/SelectableImageGrid";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

export const Breed = () => {
  const clients = useContext(ClientsContext);
  const [nfts, setNfts] = useState<AINft[]>([]);
  const { data } = useSWR("/generate/seed", () => {
    console.log('getting seed');
    return clients.apiClient.getSeed(25)
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) return;
    const nfts = data.map((elem) => {
      return { imageURL: elem.image, genome: elem.genome };
    });
    setNfts(nfts);
  }, [data]);

  const [selectedParents, setSelectedParents] = useState<number[]>([]);
  const selectedNfts = useMemo(() => {
    return selectedParents.map((index) => nfts[index]);
  }, [selectedParents, nfts]);

  const onBreedClick = useCallback(() => {
    console.log('Breed click')
    console.log('selectedNfts', selectedNfts);
    clients.apiClient
      .evolve(
        selectedNfts.map((nft) => nft.genome),
        25,
      )
      .then((res) => {
        const nextGen = res.map((elem) => {
          return { imageURL: elem.image, genome: elem.genome };
        });
        setNfts(nextGen);
        setSelectedParents([]);
      });
  }, [selectedNfts, clients]);

  const onImageClick = (index: number) => {
    if (selectedParents.includes(index)) {
      setSelectedParents(selectedParents.filter((elem) => elem !== index));
    }
    else {
      setSelectedParents([...selectedParents, index]);
    }
  }

  const startMinting = useCallback(() => {
    navigate("/breed/mint", { state: { nfts: nfts } });
  }, [nfts, navigate]);

  return (
    <Layout>
      <main className="flex flex-col w-full p-4 text-center">
        <h4 className="text-center font-bold">Generated art</h4>
        <p className="text-center text-slate-600">
          Select images for breeding the next generation of images.
        </p>
        <section className="md:px-20 px-4 py-4 mx-auto">
          <SelectableImageGrid
            imgUrls={nfts.map((nft) => nft.imageURL)}
            selected={selectedParents}
            onImageClick={onImageClick}
          />
        </section>

        <section className="md:px-12 px-4 py-4 text-center flex mx-auto gap-8">
          <Button text="Breed new generation" onClick={onBreedClick} />
          <Button text="Select generation" onClick={startMinting} />
        </section>
      </main>
    </Layout>
  );
};
