export const dateFormat = (date: Date | string | null) => {
  const dateFormat = new Date(date);
  const formattedDate = `${dateFormat.getFullYear()}-${(dateFormat.getMonth() + 1).toString().padStart(2, "0")}-${dateFormat.getDate().toString().padStart(2, "0")}`;

  return formattedDate; //YYYY-MM-DD
};
