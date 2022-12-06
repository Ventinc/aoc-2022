const input = await Deno.readTextFile('input.txt');

const line = input.split('');

let fourChars = '';
let lastTry = 0;
let i = 0;

while (i < line.length) {
  const c = line[i];
  // console.log({ fourChars, c, include: fourChars.includes(c), lastTry, i });
  if (fourChars.includes(c)) {
    i = lastTry + 1;
    lastTry = i;
    fourChars = `${line[i]}`;
  } else {
    fourChars = `${fourChars}${c}`;
  }

  if (fourChars.length === 14) {
    console.log(i + 1);
    break;
  }
  i++;
}
