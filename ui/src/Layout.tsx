import { PropsWithChildren } from "react";
import { Navbar } from "./components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

export const Layout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const { address } = useAccount();
  const navigate = useNavigate();

  const pathCategory = `/${pathname.split("/")[1] ?? ""}`;

  if (pathCategory !== "/") {
    if (!address) {
      navigate("/");
    }
  }

  return (
    <div className="h-full flex flex-col">
      <Navbar currentHref={pathCategory} />
      <div className="flex-grow flex flex-col p-4 w-auto m-0 bg-orange-50">
        {children}
      </div>
    </div>
  );
};
