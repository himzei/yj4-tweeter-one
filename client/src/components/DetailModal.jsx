import { AnimatePresence, motion } from "framer-motion";
import Avatar from "./Avatar";
import CommentView from "./CommentView";
import CommentForm from "./CommentForm";
import TweetContent from "./TweetContent";

export default function DetailModal({ isOpen, setIsOpen, item }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-neutral-200 to-neutral-100 text-white rounded-lg max-w-7xl w-full shadow-xl cursor-default relative overflow-hidden grid grid-cols-[3fr_2fr]"
          >
            {/* 이미지 */}
            <div className="w-full border border-neutral-300 aspect-[4/3] flex items-center justify-center">
              <img
                src={item.photo}
                alt="photo_details"
                className="w-full h-full object-cover"
              />
            </div>
            {/* 댓글 */}
            <div className="w-full flex flex-col justify-between">
              {/* 프로필 */}
              <div className="flex flex-col gap-2">
                <div className="p-4">
                  <Avatar
                    size="size-12"
                    username={item?.writer.username}
                    photo={item?.writer?.avatar}
                  />
                </div>
                <div className="px-4 py-2">
                  <TweetContent item={item} />
                </div>
                <CommentView item={item} />
              </div>
              {/* comment writer */}
              <div className="p-4">
                <CommentForm tweetId={item?._id} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
