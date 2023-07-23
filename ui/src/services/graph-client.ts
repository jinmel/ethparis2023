import { useEffect, useState } from "react";
import { OwnedAINFT } from "./models";

export const VITE_THE_GRAPH_URL = import.meta.env.VITE_THE_GRAPH_URL;

export type RawNFTQueryData = {
  data: {
    tokenOwners: OwnedAINFT[];
  };
};

export const useTheGraphNFTQuery = ({
  address,
}: {
  address: string | undefined;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<OwnedAINFT[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const asyncFn = async () => {
      // Clear previous data.
      setData(undefined);
      setError(undefined);

      setLoading(true);
      const response = await fetch(VITE_THE_GRAPH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
              {
                tokenOwners(where: {owner: "${address}"}) {
                  id
                  owner
                  tokenId
                }
              }
            `,
        }),
      });
      if (response.ok) {
        const json: RawNFTQueryData = await response.json();
        setData(json.data.tokenOwners);
      } else {
        setError(`Got error when querying: ${await response.json()}`);
      }
      setLoading(false);
    };
    if (!loading && address) {
      asyncFn();
    }
  }, [address, loading]);

  return { data, loading, error };
};
