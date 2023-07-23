const IMAGE_BASE_URL = import.meta.env.VITE_ML_BACKEND_API_URL;

export const SelectedImageViewer = ({
  imgUrl,
  genome,
  nftInfo,
}: {
  imgUrl?: string;
  genome?: number[];
  nftInfo?: {
    id: string;
    address: string;
  };
}) => {
  return (
    <div className="flex md:flex-row flex-col justify-between mx-auto md:max-h-[500px]">
      <section className="flex rounded-lg outline outline-4 outline-pink-500 mr-5 md:max-w-[400px] content-center">
        <img
          className="h-auto max-w-full rounded-lg object-contain"
          src={`${IMAGE_BASE_URL}${imgUrl}`}
          alt="mintImage"
        />
      </section>
      {genome ? (
        <section className="flex flex-col p-4 text-left md:max-w-[200px] md:w-[200px]">
          <span className="font-bold underline">Genome</span>
          <span className="italic"><p className="">{genome}</p></span>
          {nftInfo && (
            <>
              <span className="font-bold underline">ID</span>
              <span className="italic">{nftInfo?.id}</span>
              <span className="font-bold underline">Mint address</span>
              <span className="italic">
                <a
                  href={`https://gnosis.nftscan.com/${nftInfo?.id}/${nftInfo?.address}`}
                >
                  {nftInfo?.address}
                </a>
              </span>
            </>
          )}
        </section>
      ) : (
        <section className="flex flex-col p-4 text-center align-middle justify-center max-w-[200px] w-[200px]">
          <span className="font-bold">Nothing selected yet.</span>
        </section>
      )}
    </div>
  );
};
