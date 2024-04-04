import { useQuery } from "react-query";
import Avatar from "../components/Avatar";
import Layout from "../components/Layout";
import LayoutWithMenu from "../components/LayoutWithMenu";

import { apiGetProfileTweet } from "../api";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import DetailModal from "../components/DetailModal";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState();
  const handleClick = (tweet) => {
    setIsOpen(true);
    setItem(tweet);
  };
  const {
    state: { id, username, photo },
  } = useLocation();
  const { data: getData } = useQuery(
    ["getProfileTweet", { userId: id }],
    apiGetProfileTweet
  );

  console.log(getData);

  return (
    <Layout>
      <LayoutWithMenu>
        <DetailModal isOpen={isOpen} setIsOpen={setIsOpen} item={item} />
        <div>
          <div className="w-full h-40 flex justify-center items-center">
            <Avatar
              size="size-20"
              textSize="text-xl"
              username={username}
              photo={photo}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {getData?.data.map((item, i) => (
              <div
                onClick={() => handleClick(item)}
                className="w-full aspect-square rounded-md bg-red-500 overflow-hidden cursor-pointer"
                key={i}
              >
                <img
                  src={item.photo}
                  alt="profile tweet"
                  className="w-full h-full object-fit"
                />
              </div>
            ))}
          </div>
        </div>
      </LayoutWithMenu>
    </Layout>
  );
}
