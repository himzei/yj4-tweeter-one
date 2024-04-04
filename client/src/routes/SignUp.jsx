import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import Socials from "../components/Socials";
import { useMutation } from "react-query";
import { apiPostRegister } from "../api";
import { Link } from "react-router-dom";

export default function SignUp() {
  const { register, handleSubmit } = useForm();
  const { mutate } = useMutation(apiPostRegister);
  const onValid = (data) => mutate(data);
  return (
    <Layout>
      <div className="flex flex-col gap-5 py-16">
        <div className="text-center text-2xl font-bold text-blue-500">
          영진트윗 회원가입
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
            {...register("email")}
            type="text"
            placeholder="이메일"
          />
          <input
            className="custom-input"
            {...register("mobile")}
            type="text"
            placeholder="모바일"
          />
          <input
            className="custom-input"
            {...register("password")}
            type="text"
            placeholder="패스워드"
          />
          <input
            className="custom-input"
            {...register("password2")}
            type="text"
            placeholder="패스워드 확인"
          />
          <button className="button-custom">전송</button>
        </form>
        <Socials />
        <div className="px-2 text-sm font-semibold text-neutral-500 text-center">
          이미 회원가입이 되어 있으면{" "}
          <Link className="hover:underline hover:text-blue-500" to="/login">
            로그인
          </Link>
        </div>
      </div>
    </Layout>
  );
}
