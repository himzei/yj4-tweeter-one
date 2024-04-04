import { Navigate } from "react-router-dom";
import useSession from "../lib/useSession";

export default function HomeToRoute({ children }) {
  const { data, isLoading } = useSession();

  if (!isLoading && data?.isLogin) {
    return <Navigate to="/" />;
  }
  return children;
}
