import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { formatToTimeAgo } from "../lib/utils";

export default function CommentView({ item }) {
  return (
    <div className="flex flex-col">
      {item?.comments?.map((comment, i) => (
        <div
          key={i}
          className="flex justify-between text-neutral-500 text-md px-4 h-10 items-center"
        >
          <Link
            state={{
              id: comment.writer._id,
              username: comment.writer.username,
              photo: comment.writer.avatar,
            }}
            to="/profile"
            className="flex h-full items-center text-sm gap-2"
          >
            <Avatar
              size="size-8"
              username={comment?.writer.username}
              photo={comment?.writer.avatar}
            />
            <div>{comment?.comment}</div>
          </Link>
          <div className="h-full flex items-center text-xs text-neutral-400">
            {formatToTimeAgo(comment?.createdAt)}
          </div>
        </div>
      ))}
    </div>
  );
}
