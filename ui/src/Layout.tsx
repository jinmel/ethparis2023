import { PropsWithChildren } from "react";
import { Navbar } from "./components/Navbar";
import { useLocation } from "react-router-dom";

export const Layout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const pathCategory = `/${pathname.split("/")[1] ?? ""}`;
  return (
    <div className="h-full flex flex-col">
      <Navbar currentHref={pathCategory} />
      <div className="flex-grow flex flex-col p-4 w-auto h-full m-0 bg-orange-50">
        {children}
      </div>
    </div>
  );
};
