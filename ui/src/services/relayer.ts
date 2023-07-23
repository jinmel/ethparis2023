import { useCallback, useState } from "react";
import useSWR from "swr";

export const VITE_RELAYER_URL = import.meta.env.VITE_RELAYER_URL;

export type RegisterRequest = {
  userAddr: string;
  root: string;
  group: string;
  signal: string;
  nullifierHash: string;
  appID: string;
  actionID: string;
  proof: string;
};

export const useRelayerRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<{data : string}>();
  const [error, setError] = useState<string>();

  const call = useCallback(
    async (req: RegisterRequest) => {
      if (!loading && req) {
        setData(undefined);
        setError(undefined);

        setLoading(true);
        const response = await fetch(`${VITE_RELAYER_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
        });

        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          setError(`Got error when querying: ${await response.json()}`);
        }
        setLoading(false);
      }
    },
    [loading],
  );

  return { data, loading, error, call };
};

export const useRelayerGetStatus = (address: string) => {
  const { data, error, isLoading } = useSWR(
    `${VITE_RELAYER_URL}/user/${address}/status`,
  );
  const isRegistered = data ? (data?.status === 1 ? true : false) : undefined;

  return { data: isRegistered, error, isLoading };
};
