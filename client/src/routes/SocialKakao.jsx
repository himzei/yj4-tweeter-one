import { useQuery } from "react-query";
import { Navigate, useLocation } from "react-router-dom";
import { apiKakaoLogin } from "../api";

export default function SocialKakao() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const code = params.get("code");

  const { data } = useQuery(["getUser", { code }], apiKakaoLogin);
  if (data?.result === true) {
    return <Navigate to="/" />;
  }
  return <div>잠시만 기다려 주세요</div>;
}
