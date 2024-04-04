import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkDownViewer({ content }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>;
}
