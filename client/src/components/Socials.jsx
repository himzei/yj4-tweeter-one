import { Link } from "react-router-dom";

export default function Socials() {
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize`;
  const config = {
    response_type: "code",
    client_id: process.env.REACT_APP_KAKAO_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${kakaoUrl}?${params}`;
  console.log(finalUrl);
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full h-px bg-neutral-300" />
      <div className="flex flex-col gap-2">
        <Link to={finalUrl}>
          <div className=" flex items-center justify-center rounded-3xl font-semibold w-full  bg-yellow-400 text-center h-12">
            <span>카카오 로그인</span>
          </div>
        </Link>
        <div className=" flex items-center justify-center rounded-3xl font-semibold w-full text-white bg-red-500 text-center h-12">
          <span>구글 로그인</span>
        </div>
      </div>
    </div>
  );
}
