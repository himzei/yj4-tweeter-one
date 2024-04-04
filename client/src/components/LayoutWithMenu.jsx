import { FaHome } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { apiPostLogout } from "../api";
import { AiFillPlusSquare } from "react-icons/ai";
import { useQueryClient } from "react-query";
import Avatar from "./Avatar";
import { Link, useLocation } from "react-router-dom";
import useSession from "../lib/useSession";

export default function LayoutWithMenu({ children }) {
  const queryClient = useQueryClient();
  const { data } = useSession();
  const { pathname } = useLocation();

  console.log(data);
  const handleLogout = async () => {
    const data = await apiPostLogout();
    if (data?.result) {
      await queryClient.invalidateQueries("getSession");
    }
  };

  return (
    <>
      <div className="flex flex-col relative">
        {/* menu */}
        <div className="flex w-full justify-end gap-3 py-4 mb-5 border-b border-neutral-300">
          <Link
            to="/"
            className={`${
              pathname === "/" ? "text-blue-500" : "text-neutral-700"
            } flex justify-center items-center`}
          >
            <FaHome size="26" />
          </Link>
          <Link
            to="/tweet-write"
            className={`${
              pathname === "/tweet-write" ? "text-blue-500" : "text-neutral-700"
            } flex justify-center items-center`}
          >
            <AiFillPlusSquare size="28" />
          </Link>

          <Link
            to={`/profile`}
            state={{
              id: data?.user?.id,
              username: data?.user?.username,
              photo: data?.user?.avatar,
            }}
            className="flex justify-center items-center"
          >
            <Avatar size="size-10" text="hidden" photo={data?.user?.avatar} />
          </Link>

          <button
            onClick={handleLogout}
            className="flex justify-center items-center text-neutral-700"
          >
            <RiLogoutBoxRFill size="28" />
          </button>
        </div>
        {/* contents */}
        <div className="">{children}</div>
      </div>
    </>
  );
}
