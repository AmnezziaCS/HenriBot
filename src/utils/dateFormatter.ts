export const dateFormatter = (date: Date): string => {
  const fixedYear = date.getFullYear();

  const month = (1 + date.getMonth()).toString();
  const fixedMonth = month.length > 1 ? month : "0" + month;

  const day = date.getDate().toString();
  const fixedDay = day.length > 1 ? day : "0" + day;

  return `${fixedYear}/${fixedMonth}/${fixedDay}`;
}
