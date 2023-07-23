import { useEffect, useState } from "react";

export const SelectableImageGrid = ({
  imgUrls,
  onAllImageSelected,
  maxSelectable,
  autoSelect = false,
  onMaxImageSelected,
}: {
  imgUrls: string[];
  onAllImageSelected: (selectedImgs: number[]) => void;
  maxSelectable: number;
  autoSelect?: boolean;
  onMaxImageSelected?: () => void;
}) => {
  const [selected, setSelected] = useState<number[]>([]);
  const selectionInteraction = (idx: number) => () => {
    if (selected.includes(idx)) {
      return setSelected((prev) => prev.filter((prevId) => prevId !== idx));
    }

    /**
     * When the selected image is at the maxSelectable,
     * we essentially tell user they can't select more.
     * However, if autoSelect is true, we will automatically remove the earliest selected image
     * and replace it with the newly selected one.
     */
    if (!autoSelect) {
      if (selected.length === maxSelectable) {
        return onMaxImageSelected ? onMaxImageSelected() : undefined;
      }
      // Adding to selection
      setSelected((prev) => [...prev, idx]);
    } else {
      // Replace the earliest selected image with the newly selected one
      setSelected((prev) => {
        if (prev.length < maxSelectable) {
          return [...prev, idx];
        }

        const [, ...others] = prev;
        return [...others, idx];
      });
    }

    return undefined;
  };

  useEffect(() => {
    if (selected.length >= maxSelectable) {
      onAllImageSelected(selected);
    }
  }, [selected]);

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mx-auto">
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
