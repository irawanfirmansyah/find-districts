const HighlightedText = ({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) => {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  if (parts.length === 1) {
    return text;
  }
  return (
    <span>
      {parts.map((part, index) => {
        if (part.toLowerCase() === highlight.toLowerCase()) {
          return (
            <span key={index} className="font-bold text-indigo-700">
              {part}
            </span>
          );
        }
        return part;
      })}
    </span>
  );
};

export default HighlightedText;