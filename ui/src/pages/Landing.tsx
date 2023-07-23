import { CredentialType, IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import { useCallback } from "react";
import { Layout } from "../Layout";
import { Button } from "../components/Button";
import { useAccount } from "wagmi";
import { Navigate } from "react-router-dom";
import { useRelayerGetStatus, useRelayerRegister } from "../services/relayer";

const action = "signup";
const appID = "app_574b973f44f8e4ce8aef8b29c16aea75";
const signal = "";
// const credentialType = CredentialType.Orb;

export const Landing = () => {
  const { address } = useAccount();

  const { data: isRegistered } = useRelayerGetStatus(address || "");

  const { call } = useRelayerRegister();

  const handleProof = useCallback(() => {
    return new Promise<void>((resolve) => {
      console.log("handleProof");
      setTimeout(() => resolve(), 3000);
    });
  }, []);

  const onSuccess = (result: ISuccessResult) => {
    console.log("onSuccess");
    console.log(result);
    if (address) {
      call({
        userAddr: address,
        root: result.merkle_root,
        group: "0x1",
        signal: "",
        nullifierHash: result.proof,
        proof: result.proof,
        appID,

        actionID: action,
      });
    }
  };

  const LandingView = () => {
    if (!address) {
      return (
        <>
          <p className="text-xl font-bold">Welcome!</p>{" "}
          <p>Please connect your wallet to continue.</p>
        </>
      );
    }
    if (isRegistered) {
      return (
        <div className="flex flex-col gap-4">
          <p>Looks like its your first time here!</p>
          <p>Let's make sure you are a unique person.</p>
          <IDKitWidget
            action={action}
            signal={signal}
            onSuccess={onSuccess}
            handleVerify={handleProof}
            app_id={appID}
            credential_types={[CredentialType.Orb, CredentialType.Phone]}
          >
            {({ open }) => (
              <Button text="Sign in with Worldcoin" onClick={open} />
            )}
          </IDKitWidget>
        </div>
      );
    }

    return <Navigate to="/collection" />;
  };

  return (
    <Layout>
      <main className="flex w-full p-4 text-center">
        <div className="mx-auto">
          <LandingView />
        </div>
      </main>
    </Layout>
  );
};
