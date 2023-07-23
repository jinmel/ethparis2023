import { useEffect, useState, useMemo } from "react";
import { Layout } from "../Layout";
import { Button } from "../components/Button";
import { SelectableImageGrid } from "../components/SelectableImageGrid";
import { SelectedImageViewer } from "../components/SelectedImageViewer";
import { ERC7007Info } from "../services/models";
import { useLocation } from "react-router-dom";
import { useContractWrite } from "wagmi";
import * as erc7007Abi from "../../abi/erc7007Abi.json";
import { toast } from "react-toastify";
import { AINft } from "../services/models";


export const Mint = () => {
  const location = useLocation();
  const nfts = location.state?.nfts as AINft[];

  const { data, isSuccess, write } = useContractWrite({
    address: `0x${import.meta.env.VITE_ERC7007_ADDR}`,
    abi: erc7007Abi,
    functionName: "mint",
  });

  const mintToken = () => {
    if (write) {
      const args = [
        "0x01", // prompt (genome)
        "0x01", // aigcData
        "some string", // uri
        "0x01", // proof
      ];

      write({
        args,
      });

      // call ipfs
    }
  };

  useEffect(() => {
    if (isSuccess && data?.hash) {
      toast("Success");
    }
  }, [data, isSuccess]);

  const [selected, setSelected] = useState<number[]>([]);
  const onImageClick = (index: number) => {
    setSelected([index]);
  }

  const tokenInfo: ERC7007Info | undefined = useMemo(() => {
    if (nfts.length > 0 && selected.length > 0) {
      const nftInfo = nfts[selected[0]];
      return {
        genome: nftInfo.genome,
        imgUrl: nftInfo.imageURL,
        name: "Zenetik NFT",
      }
    } else {
      return undefined;
    }
  }, [selected, nfts]);

  return (
    <Layout>
      <main className="flex flex-col w-full p-4 text-center">
        <h4 className="text-center font-bold">Minting!</h4>
        <p className="text-center text-slate-600">
          Select the art that you would like to mint as a ERC-7007
        </p>

        <section className="md:px-20 px-4 py-4 mx-auto">
          <SelectedImageViewer
            genome={tokenInfo?.genome}
            imgUrl={tokenInfo?.imgUrl ? tokenInfo.imgUrl : "/400x300.svg"}
          />
        </section>

        <section className="md:px-12 px-4 py-4 text-center flex mx-auto gap-8">
          <Button text="MINT" onClick={mintToken} />
        </section>
        <hr />
        <section className="md:px-20 px-4 py-4 mx-auto">
          <SelectableImageGrid
            imgUrls={nfts.map((nft) => nft.imageURL)}
            selected={selected}
            onImageClick={onImageClick}
          />
        </section>
      </main>
    </Layout>
  );
};
