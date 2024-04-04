import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { apiPostTweetCreate } from "../api";
import { useState } from "react";
import Layout from "../components/Layout";
import LayoutWithMenu from "../components/LayoutWithMenu";
import Avatar from "../components/Avatar";
import { FaPhotoVideo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useSession from "../lib/useSession";

export default function TweetForm() {
  const { data } = useSession();
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(null);
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    if (files && files.length === 1) {
      setFile(files[0]);
      const url = URL.createObjectURL(files[0]);
      setPreview(url);
    }
  };
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { mutate } = useMutation(apiPostTweetCreate, {
    onSuccess: (data) => {
      if (data.result) {
        reset();
        navigate("/");
      }
    },
  });

  const onValid = async (formData) => {
    mutate({ formData, file });
  };

  return (
    <Layout>
      <LayoutWithMenu>
        <div className="w-full border border-neutral-200 rounded-2xl flex flex-col shadow-md">
          <div className="p-4">
            <Avatar
              photo={data?.user?.avatar}
              size="size-10"
              username={data?.user?.username}
            />
          </div>
          <form onSubmit={handleSubmit(onValid)} className="flex flex-col ">
            <div className="flex flex-col">
              <label
                className=" bg-transparent border-4 border-dashed border-blue-500  text-blue-500 flex flex-col items-center justify-center w-full aspect-video cursor-pointer  bg-center bg-cover"
                htmlFor="file"
                style={{ backgroundImage: `url(${preview})` }}
              >
                {preview === null ? (
                  <>
                    <FaPhotoVideo size="80" />
                    <span>사진을 추가해 주세요!</span>
                  </>
                ) : null}
              </label>
              <input
                onChange={onFileChange}
                className="hidden"
                type="file"
                accept="image/*"
                id="file"
              />
            </div>
            <textarea
              className="p-4 h-60"
              placeholder="내용을 입력해 주세요"
              {...register("content")}
            ></textarea>

            <button className="h-10 bg-blue-500 text-white rounded-xl hover:bg-blue-400 transition">
              전송하기
            </button>
          </form>
        </div>
      </LayoutWithMenu>
    </Layout>
  );
}
