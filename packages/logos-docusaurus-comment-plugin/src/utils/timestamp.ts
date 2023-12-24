export const formatTimestamp = (createdAtString: string) => {
  const createdAt = new Date(createdAtString);

  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return formatter.format(createdAt);
};