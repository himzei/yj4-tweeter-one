import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import Socials from "../components/Socials";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { apiPostLogin } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const { mutate } = useMutation(apiPostLogin, {
    onSuccess: (data) => {
      if (data.result === true) {
        navigate("/");
      }
    },
  });
  const onValid = (data) => mutate(data);
  return (
    <Layout>
      <div className="flex flex-col gap-5 py-16">
        <div className="text-center text-2xl font-bold text-blue-500">
          영진트윗 로그인
        </div>
        <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-4">
          <input
            className="custom-input"
            {...register("username")}
            type="text"
            placeholder="아이디"
          />

          <input
            className="custom-input"
            {...register("password")}
            type="text"
            placeholder="패스워드"
          />

          <button className="button-custom">로그인</button>
        </form>
        <Socials />
        <div className="px-2 text-sm font-semibold text-neutral-500 text-center">
          이미 회원가입이 되어 있으면{" "}
          <Link className="hover:underline hover:text-blue-500" to="/signup">
            회원가입
          </Link>
        </div>
      </div>
    </Layout>
  );
}
