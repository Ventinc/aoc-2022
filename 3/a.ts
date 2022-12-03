const input = await Deno.readTextFile('input.txt');

const lines = input.split('\n');

const charToNumber = (char: string) => {
  const charNumber = char.charCodeAt(0);

  if (charNumber >= 97 && charNumber <= 122) {
    return charNumber - 96;
  }

  return charNumber - 65 + 27;
};

const linesType = lines.map((line) => {
  const firstPart = line.substring(0, line.length / 2).split('');
  const secondPart = line.substring(line.length / 2, line.length).split('');

  const intersection = firstPart.filter((item) => secondPart.includes(item));

  return charToNumber(intersection[0]);
});

console.log(linesType.reduce((prev, current) => prev + current, 0));
