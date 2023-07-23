import { createContext } from "react";
import { ApiClient, ML_BACKEND_API_URL } from "../services/clients";

export const ClientsContext = createContext({
  apiClient: new ApiClient(ML_BACKEND_API_URL),
});
