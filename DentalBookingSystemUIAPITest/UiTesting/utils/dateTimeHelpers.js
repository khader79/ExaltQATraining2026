export const formatDateForInput = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}${day}${year}`;
};

export const getDateWithOffsetDays = (daysOffset) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return formatDateForInput(date);
};

export const getTimeWithOffsetMinutes = (minutesOffset) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutesOffset);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};
