import { useQuery } from "react-query";
import Layout from "../components/Layout";
import LayoutWithMenu from "../components/LayoutWithMenu";
import { apiGetTweetRead } from "../api";
import Avatar from "../components/Avatar";
import CommentForm from "../components/CommentForm";
import { Link } from "react-router-dom";
import { useState } from "react";
import DetailModal from "../components/DetailModal";
import CommentView from "../components/CommentView";
import TweetContent from "../components/TweetContent";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState();
  const { data, isLoading } = useQuery("getTweets", apiGetTweetRead);
  const handleClick = (tweet) => {
    setIsOpen(true);
    setItem(tweet);
  };

  return (
    <Layout>
      <LayoutWithMenu>
        <DetailModal isOpen={isOpen} setIsOpen={setIsOpen} item={item} />
        {isLoading ? (
          "Loading.."
        ) : (
          <div className="flex flex-col">
            <div className="flex flex-col gap-5">
              {data?.data.map((item, i) => (
                <div
                  key={i}
                  className="w-full border border-neutral-200 rounded-2xl flex flex-col shadow-md mb-8"
                >
                  {/* 프로필 */}
                  <Link
                    to={`/profile`}
                    state={{
                      id: item?.writer._id,
                      username: item?.writer.username,
                      photo: item?.writer.avatar,
                    }}
                    className="p-4"
                  >
                    <Avatar
                      size="size-12"
                      username={item?.writer.username}
                      photo={item?.writer.avatar}
                    />
                  </Link>
                  {/* photo */}
                  <div
                    onClick={() => handleClick(item)}
                    className="w-full aspect-video overflow-hidden cursor-pointer"
                  >
                    <img
                      className="w-full h-full object-cover object-center"
                      src={item.photo}
                      alt="tweet"
                    />
                  </div>
                  {/* 켄텐츠 */}
                  <div className="p-4">
                    <TweetContent item={item} />
                  </div>
                  {/* 댓글 */}
                  <div className="flex flex-col gap-4">
                    {/* 댓글보기 */}
                    <CommentView item={item} />
                    <CommentForm tweetId={item?._id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </LayoutWithMenu>
    </Layout>
  );
}
