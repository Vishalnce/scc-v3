export const extractImages = (html: string): string[] => {
  if (!html) return [];

  const div = document.createElement("div");
  div.innerHTML = html;

  return Array.from(div.querySelectorAll("img"))
    .map((img) => img.getAttribute("src"))
    .filter((src): src is string => !!src);
};