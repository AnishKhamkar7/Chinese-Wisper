export const titleGenerator = (content: string): string => {
  const words = content.split(" ");

  const title = words.slice(0, 6).join(" ");

  return title + "...";
};
