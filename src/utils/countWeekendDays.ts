export const countWeekendDays = (startDate: Date, endDate: Date) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let count = 0;

  while (start <= end) {
    const dayOfWeek = start.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      count++;
    }
    start.setDate(start.getDate() + 1);
  }

  return count;
}