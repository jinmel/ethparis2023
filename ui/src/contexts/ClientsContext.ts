import { createContext } from "react";
import { ApiClient } from "../services/clients";

export const ClientsContext = createContext({
  apiClient: new ApiClient("http://localhost:8080"),
});
