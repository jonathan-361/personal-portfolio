export const getFullName = (
  names: string,
  firstLastName: string,
  secondLastName: string,
) => {
  return [names, firstLastName, secondLastName].filter(Boolean).join(" ");
};
