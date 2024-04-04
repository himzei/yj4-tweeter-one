import { useMutation, useQueryClient } from "react-query";
import { apiPostCommentCreate } from "../api";
import { useForm } from "react-hook-form";

export default function CommentForm({ tweetId }) {
  const { reset, register, handleSubmit } = useForm();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiPostCommentCreate, {
    onSuccess: async (data) => {
      if (data.result) {
        reset();
        await queryClient.invalidateQueries("getTweets");
      }
    },
  });
  const onValid = (data) => mutate({ data, tweetId });
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("comment")}
        placeholder="Add a Comment..."
        type="text"
        className="custom-input rounded-xl w-full placeholder:text-sm placeholder:text-neutral-300"
      />
    </form>
  );
}
