const input = await Deno.readTextFile('input.txt');

const line = input.split('');

let fourChars = '';

for (let i = 0; i < line.length; i++) {
  const c = line[i];
  // console.log({ fourChars, c, include: fourChars.includes(c) });
  if (fourChars.includes(c)) {
    fourChars = `${c}`;
  } else {
    fourChars = `${fourChars}${c}`;
  }

  if (fourChars.length === 4) {
    console.log(i + 1);
    break;
  }
}
