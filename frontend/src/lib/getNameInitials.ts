export function getTwoLetterNameInitials(name: string) {
  const nameArray = name.split(" ");

  // if there is more than one word
  if (nameArray.length > 1) {
    const firstWord = nameArray[0];
    const secondWord = nameArray[1];
    return `${firstWord[0]}${secondWord[0]}`;
  }

  // if there is single word
  return name.slice(0, 2);
}
