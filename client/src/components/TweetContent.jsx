import { formatToTimeAgo } from "../lib/utils";
import MarkDownViewer from "./MarkDownViewer";

export default function TweetContent({ item }) {
  return (
    <div className="text-neutral-700 flex flex-col gap-2">
      <pre className="">
        <MarkDownViewer className="prose lg:prose-xl" content={item?.content} />
      </pre>
      <div className="text-xs font-light">
        {formatToTimeAgo(item?.createdAt)}
      </div>
    </div>
  );
}
