import { useState } from "react";

export const GeneratedSelectableImageGrid = ({
  imgUrls,
  onAllImageSelected,
  maxSelectable,
  onMaxImageSelected,
}: {
  imgUrls: string[];
  onAllImageSelected: (selectedImgs: string[]) => void;
  maxSelectable: number;
  onMaxImageSelected?: () => void;
}) => {
  const [selected, setSelected] = useState<number[]>([]);

  const selectionInteraction = (idx: number) => () => {
    if (selected.includes(idx)) {
      return setSelected((prev) => prev.filter((prevId) => prevId !== idx));
    }

    if (selected.length === maxSelectable) {
      return onMaxImageSelected ? onMaxImageSelected() : undefined;
    }

    // Adding to selection
    setSelected((prev) => [...prev, idx]);
    const newSelected = [...selected, idx];

    if (selected.length + 1 === maxSelectable) {
      return onAllImageSelected(
        imgUrls.filter((v, urlIdx) => newSelected.includes(urlIdx)),
      );
    }

    return undefined;
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
      {imgUrls.map((url, idx) => (
        <div
          onClick={selectionInteraction(idx)}
          className={`rounded-lg ${
            selected.includes(idx) ? "outline outline-2 outline-pink-500" : ""
          }`}
        >
          <img
            className="h-auto max-w-full rounded-lg"
            src={url}
            alt="generate"
          />
        </div>
      ))}
    </div>
  );
};
