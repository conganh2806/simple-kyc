export const capitalize = (s: string): string => {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const formatLabel = (s: string): string => {
  if (!s) return "";

  const words = s.split(/[-_]/);
  return words.map((w) => capitalize(w)).join(" ");
};
