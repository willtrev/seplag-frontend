export const handleDateFormat = (date: string) => {
  const newDate = new Date(date);
  const formatedDate = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
  }).format(newDate);

  return formatedDate;
};
