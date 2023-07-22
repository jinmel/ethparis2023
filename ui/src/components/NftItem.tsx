import { AINft } from "../services/models";

interface NftItemProps {
  nft: AINft;
  onClick: () => void;
}

export const NftItem = ({ nft, onClick }: NftItemProps) => {
  return (
    <div
      className="relative w-auto max-h-[300px] align-middle justify-center overflow-hidden rounded-lg shadow-lg cursor-pointer"
      onClick={onClick}>
      <img
        src={nft?.imageURL}
        className="object-contain rounded-md w-full h-auto"
      />
      <figcaption className="absolute px-4 text-lg text-white bottom-0 p-2 bg-gray-700/60 w-full text-right">
        <p>#{nft.id}</p>
      </figcaption>
    </div>
  );
};
