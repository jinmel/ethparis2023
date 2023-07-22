import { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col p-4 w-auto h-full m-0 bg-orange-50">
    {children}
  </div>
);
