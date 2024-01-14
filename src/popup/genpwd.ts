interface Options {
  symbolSet: string;
  hasSymbol: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  length: number;
}

export function genpwd(options: Options): string {
  const { symbolSet, hasSymbol, hasUppercase, hasLowercase, hasNumber, length } = options;
  if (
    !symbolSet ||
    !hasSymbol ||
    !hasUppercase ||
    !hasLowercase ||
    !hasNumber ||
    length < 8 ||
    length > 50
  ) {
    throw new Error("Invalid options");
  }

  const symbols = symbolSet.split("");
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz".split("");
  const numbers = "0123456789".split("");
  const characterSets = [
    hasSymbol ? symbols : [],
    hasUppercase ? uppercaseLetters : [],
    hasLowercase ? lowercaseLetters : [],
    hasNumber ? numbers : [],
  ];
  const characterSet = characterSets.reduce((acc, set) => [...acc, ...set], []);
  const password: string[] = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = random(characterSet.length);
    password.push(characterSet[randomIndex]!);
  }

  if (hasLowercase) {
    limit(lowercaseLetters, password);
  }
  if (hasUppercase) {
    limit(uppercaseLetters, password);
  }
  if (hasNumber) {
    limit(numbers, password);
  }
  if (hasSymbol) {
    limit(symbols, password);
  }

  return password.join("");
}

// 0 <= random < max <= 256
function random(max: number) {
  const uint8 = new Uint8Array(1);
  window.crypto.getRandomValues(uint8);
  return uint8[0]! % max;
}

function limit(characterSet: string[], password: string[]) {
  const passwordIndex = random(password.length);
  const characterSetIndex = random(characterSet.length);
  password[passwordIndex] = characterSet[characterSetIndex]!;
}
