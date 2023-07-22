import { PropsWithChildren } from "react";
import { Navbar } from "./components/Navbar";
import { useLocation } from "react-router-dom";

export const Layout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  return (
    <div className="h-full flex flex-col">
      <Navbar currentHref={pathname} />
      <div className="flex-grow">{children}</div>
    </div>
  );
};
