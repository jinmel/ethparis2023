import { createContext } from "react";
import { ApiClient, GraphClient } from "../services/clients";

export const ClientsContext = createContext({
  apiClient: new ApiClient("http://localhost:8080"),
  graphClient: new GraphClient("http://localhost:8080", "1234"),
});
