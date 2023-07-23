const IMAGE_BASE_URL = import.meta.env.VITE_ML_BACKEND_API_URL;

export const SelectableImageGrid = ({
  imgUrls,
  selected,
  onImageClick
}: {
  imgUrls: string[];
  selected: number[];
  onImageClick: (index: number) => void;
}) => {

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mx-auto">
      {imgUrls.map((url, idx) => (
        <div
          onClick={() => onImageClick(idx)}
          className={`rounded-lg ${
            selected.includes(idx) ? "outline outline-4 outline-red-500" : ""
          }`}
        >
          <img
            className="h-auto max-w-full rounded-lg"
            src={`${IMAGE_BASE_URL}${url}`}
            alt="generate"
          />
        </div>
      ))}
    </div>
  );
};
