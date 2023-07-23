import { useState } from "react";
import { Layout } from "../Layout";
import { Button } from "../components/Button";
import { SelectableImageGrid } from "../components/SelectableImageGrid";
import { SelectedImageViewer } from "../components/SelectedImageViewer";
import { ERC7007Info } from "../services/models";
import { useLocation } from "react-router-dom";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import erc7007Abi from "../../abi/erc7007Abi.json";
import { ToastContainer, toast } from "react-toastify";

const imgUrls = [
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
];
export const Mint = () => {
  const location = useLocation();
  const [tokenInfo, setTokenInfo] = useState<ERC7007Info>({
    genome: "",
    imgUrl: "",
    name: "",
  });

  const [mintedToken, setMintedToken] = useState<
    ERC7007Info & { address: string; id: string }
  >();

  const onImageSelected = (urls: string[]) => {
    if (urls.length === 0) return;
    setTokenInfo({
      genome: "0x1234567890",
      imgUrl: urls[0],
      name: "Test",
    });
  };

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: `0x${import.meta.env.VITE_ERC7007_ADDR}`,
    abi: erc7007Abi,
    functionName: "mint",
  });

  if (isSuccess) {
    toast("Success");
  }

  const mintToken = () => {
    debugger;
    if (write) {
      const args = [
        "0x01", // prompt
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

  return (
    <Layout>
      <main className="flex flex-col w-full p-4 text-center">
        <ToastContainer />
        <h4 className="text-center font-bold">Minting!</h4>
        <p className="text-center text-slate-600">
          Select the art that you would like to mint as a ERC-7007
        </p>

        <section className="md:px-20 px-4 py-4 mx-auto">
          <SelectedImageViewer
            genome={tokenInfo.genome}
            imgUrl={tokenInfo.imgUrl ? tokenInfo.imgUrl : "/400x300.svg"}
          />
        </section>

        <section className="md:px-12 px-4 py-4 text-center flex mx-auto gap-8">
          <Button text="MINT" onClick={mintToken} />
        </section>
        <hr />
        <section className="md:px-20 px-4 py-4 mx-auto">
          <SelectableImageGrid
            autoSelect={true}
            imgUrls={imgUrls}
            onAllImageSelected={onImageSelected}
            maxSelectable={1}
          />
        </section>
      </main>
    </Layout>
  );
};
