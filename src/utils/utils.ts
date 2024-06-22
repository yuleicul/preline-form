/**
 * Format date from `YYYY-MM-DD` to `DD/MM/YYYY`
 *
 * @example
 * formatDateString("2024-05-20") // "20/05/2024"
 *
 */
export const formatDateString = (date?: string) => {
  if (!date) return "";

  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};
