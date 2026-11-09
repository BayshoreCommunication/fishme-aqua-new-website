// Plays a YouTube video from the Fish Me channel inside a positioned parent.
// `src` is a YouTube embed URL, e.g. "https://www.youtube.com/embed/<id>".
interface YouTubeEmbedProps {
  src: string;
  title: string;
  className?: string;
}

const withAutoplay = (src: string) =>
  `${src}${src.includes("?") ? "&" : "?"}autoplay=1&rel=0`;

const YouTubeEmbed = ({ src, title, className = "" }: YouTubeEmbedProps) => (
  <iframe
    src={withAutoplay(src)}
    title={title}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    className={`absolute inset-0 h-full w-full border-0 ${className}`}
  />
);

export default YouTubeEmbed;
