import { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { Layout } from "../Layout";
import { AIGeneratedChildren } from "../services/models";
import { ClientsContext } from "../contexts/ClientsContext";
import { SelectableImageGrid } from "../components/SelectableImageGrid";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

export const Breed = () => {
  const clients = useContext(ClientsContext);
  const [nfts, setNfts] = useState<AIGeneratedChildren[]>([]);
  const { data } = useSWR("/generate/seed", () =>
    clients.apiClient.getSeed(25),
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) return;
    const nfts = data.map((elem) => {
      return { imageURL: elem.image, genome: elem.genome };
    });
    setNfts(nfts);
  }, [data]);

  const [selectedParents, setSelectedParents] = useState<Array<number>>([]);

  const selectedChildren = useMemo(() => {
    return selectedParents.map((index) => nfts[index]);
  }, [selectedParents, nfts]);

  const onBreedClick = useCallback(() => {
    clients.apiClient
      .evolve(
        selectedChildren.map((nft) => nft.genome),
        25,
      )
      .then((res) => {
        const nextGen = res.map((elem) => {
          return { imageURL: elem.image, genome: elem.genome };
        });
        setNfts(nextGen);
      });
  }, [selectedChildren]);

  const startMinting = () => {
    navigate("/breed/mint", { state: { nfts } });
  };

  return (
    <Layout>
      <main className="flex flex-col w-full p-4 text-center">
        <h4 className="text-center font-bold">Generated art</h4>
        <p className="text-center text-slate-600">
          Select 3 images for breeding the next generation of children.
        </p>
        <section className="md:px-20 px-4 py-4 mx-auto">
          <SelectableImageGrid
            imgUrls={nfts.map((nft) => nft.imageURL)}
            onAllImageSelected={(selected) => setSelectedParents(selected)}
            maxSelectable={3}
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
