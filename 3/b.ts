const input = await Deno.readTextFile('input.txt');

const lines = input.split('\n');

const charToNumber = (char: string) => {
  const charNumber = char.charCodeAt(0);

  if (charNumber >= 97 && charNumber <= 122) {
    return charNumber - 96;
  }

  return charNumber - 65 + 27;
};

const intersection = (firstPart: string[], secondPart: string[]) =>
  firstPart.filter((item) => secondPart.includes(item));

const allTypesGroupNumber: number[] = [];

while (lines.length > 0) {
  const firstLine = (lines.shift() as string).split('');
  const secondLine = (lines.shift() as string).split('');
  const thirdLine = (lines.shift() as string).split('');

  const intersectTwoFirstLines = intersection(firstLine, secondLine);
  const intersectTwoSecondLines = intersection(secondLine, thirdLine);
  const overallIntersection = intersection(
    intersectTwoFirstLines,
    intersectTwoSecondLines
  );

  allTypesGroupNumber.push(charToNumber(overallIntersection[0]));
}

console.log(allTypesGroupNumber.reduce((prev, current) => prev + current, 0));
