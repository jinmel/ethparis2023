import { AINft } from "../services/models";

export const NftItem = ({ nft }: { nft: AINft }) => {
  return (
    <div key={nft.id} className="w-full h-[536px] sm:h-full ssm:h-max">
      <div className="w-full h-full ssm:h-max bg-[#272D37]/60 rounded-2xl flex flex-col p-6 sm:h-max cursor-pointer">
        <div className="relative transition duration-150 ease-in-out delay-150">
          <img
            src={nft?.imageURL}
            alt="mock"
            className="w-full h-[352px] ssm:h-max rounded-2xl "
          />
        </div>
        <div className="">
          <h1>{nft.id}</h1>
        </div>
      </div>
    </div>
  );
};
