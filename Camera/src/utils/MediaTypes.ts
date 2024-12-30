import path from "path";

export const videoExtensions = [".m4v", ".mp4", ".mov"];
const imageExtensions = [".jpg", ".jpeg", ".png"];

export type MediaType = "image" | "video" | "null";

export const getMediaType = (uri: string) => {
  return videoExtensions.includes(path.extname(uri))
    ? "video"
    : imageExtensions.includes(path.extname(uri))
    ? "image"
    : "null";
};
