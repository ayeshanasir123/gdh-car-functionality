export function convertTo12HourFormat(timeString: string | undefined): string {
  // Parse the time string using the Date object
  const date = new Date(`1970-01-01T${timeString}`);

  // Extract the hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Format the minutes to always have two digits
  const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;

  // Return the formatted time string
  return `${hours}:${minutesFormatted} ${ampm}`;
}
