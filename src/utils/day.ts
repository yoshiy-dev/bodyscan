export const getStartOfDay = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const calculateAge = (birthday: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();

  if (
    today.getMonth() < birthday.getMonth() ||
    (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate())
  ) {
    age--;
  }

  return age;
};

export const formatDate = (date: Date, format: string): string => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  let formattedDate = format;
  formattedDate = formattedDate.replace('YYYY', year);
  formattedDate = formattedDate.replace('MM', month);
  formattedDate = formattedDate.replace('DD', day);
  formattedDate = formattedDate.replace('HH', hours);
  formattedDate = formattedDate.replace('mm', minutes);
  formattedDate = formattedDate.replace('ss', seconds);

  return formattedDate;
};
