import markdownit from "markdown-it";
import ReactMarkdown from "react-markdown";

type Props = {
  text: string;
};
const md = markdownit();

function Markdown({ text }: Props) {
  const result = md.render(text);

  // return <div dangerouslySetInnerHTML={{ __html: result }}></div>;
  return <ReactMarkdown>{text}</ReactMarkdown>;
}

export default Markdown;
