import markdownit from "markdown-it";

type Props = {
  text: string;
};
const md = markdownit();

function Markdown({ text }: Props) {
  const result = md.render(text);

  return <div dangerouslySetInnerHTML={{ __html: result }}></div>;
}

export default Markdown;
