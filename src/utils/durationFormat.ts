export const durationFormat = (durationInMinutes) => {
  const totalMinutes = parseInt(durationInMinutes, 10);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};
