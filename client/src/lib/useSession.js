import { useQuery } from "react-query";
import { apiGetSession } from "../api";

export default function useSession() {
  const { data, isLoading } = useQuery("getSession", apiGetSession);
  return { data, isLoading };
}
