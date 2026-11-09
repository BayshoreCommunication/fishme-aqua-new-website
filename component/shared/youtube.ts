// Original YouTube thumbnail for an embed URL like
// "https://www.youtube.com/embed/<id>". Every Fish Me channel video has a
// maxresdefault image, so we use the full-HD version.
export const youtubeThumbnail = (embedUrl: string) => {
  const id = embedUrl.split("/embed/")[1]?.split(/[?&]/)[0];
  return id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : "";
};
