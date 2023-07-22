import { AINft } from "../services/models";
import { NftItem } from "./NftItem";

export const BreedItem = ({
  item1,
  item2,
  onSelectedItemChange,
  onBreedClicked,
}: {
  item1: AINft;
  item2: AINft;
  onSelectedItemChange: (item1: AINft, item2: AINft) => void;
  onBreedClicked: () => void;
}) => {
  return (
    <>
      <div>
        <NftItem nft={item1} />
        <NftItem nft={item2} />
      </div>
      {/* <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div> */}
      <div>
        <button className="relative h-12 w-40 overflow-hidden border border-indigo-600 text-indigo-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
          <span className="relative z-10">Generate</span>
        </button>
        <button className="before:ease relative h-12 w-40 overflow-hidden border border-green-500 bg-green-500 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40">
          <span className="relative z-10">MINT</span>
        </button>
      </div>
    </>
  );
};
