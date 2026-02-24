const escapeSpecialChars = (str: string) => str.split('').map(char => char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');

export const onlyNumbers = (value: string, allowedSpecialChars: string = ''): boolean => {
    return new RegExp(`^[\\d\\s${escapeSpecialChars(allowedSpecialChars)}]+$`, 'u').test(value);
}

export const onlyLetters = (value: string, allowedSpecialChars: string = ''): boolean => {
    const escaped = escapeSpecialChars(allowedSpecialChars);
    const regex = new RegExp(`^[\\p{L}\\s${escaped}]+$`, 'u');
    return regex.test(value);
}

export const onlyAlphanumeric = (value: string, allowedSpecialChars: string = ''): boolean => {
    const escaped = escapeSpecialChars(allowedSpecialChars);
    const regex = new RegExp(`^[\\p{L}\\d\\s${escaped}]+$`, 'u');
    return regex.test(value);
};

export const emailFormat = (value: string, allowedSpecialChars: string = ''): boolean => {
    const escaped = escapeSpecialChars(allowedSpecialChars);
    const regex = new RegExp(`^[a-zA-Z0-9._%+-${escaped}]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$`);
    return regex.test(value);
}

export const onlyUppercase = (value: string): boolean => /^[\p{Lu}\s]+$/u.test(value);
export const onlyLowercase = (value: string): boolean => /^[\p{Ll}\s]+$/u.test(value);


export const hasForbiddenSpecialChars = (value: string, forbiddenSpecialChars: string): boolean => {
  if (!forbiddenSpecialChars || !value) return true;
  const regex = new RegExp(escapeSpecialChars(forbiddenSpecialChars), 'u');
  return regex.test(value);
};

export const hasUppercase = (value: string) => /[\p{Lu}]/u.test(value);
export const hasLowercase = (value: string) => /[\p{Ll}]/u.test(value);
export const hasNumber = (value: string) => /\d/.test(value);
export const hasSpecial = (value: string) => /[^\p{L}\d\s]/u.test(value);

export const areEquals = (valueOne: string, valueTwo: string): boolean =>  valueOne === valueTwo;