import { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col p-4 w-auto h-full bg-black m-0 align-middle justify-center">
    {children}
  </div>
);
