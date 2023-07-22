export const GeneratedImageGrid = ({ imgUrls }: { imgUrls: string[] }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
      {imgUrls.map((url) => (
        <div>
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
