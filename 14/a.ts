const input = await Deno.readTextFile('input.txt');

const lines = input
  .split('\n')
  .map((line) =>
    line
      .split(' -> ')
      .map((value) => value.split(',').map((nbrString) => parseInt(nbrString)))
  );

const horizontalPos = lines.flat(1).map((v) => v[0]);
const verticalPos = lines.flat(1).map((v) => v[1]);

const minX = Math.min(...horizontalPos);
const maxX = Math.max(...horizontalPos);
const minY = 0;
const maxY = Math.max(...verticalPos);

const w = maxX - minX;
const h = maxY - minY;

const sandFlowPosX = 500 - minX - 1;

console.log({ w, h, sandFlowPosX });

const cave: string[][] = Array(h)
  .fill([])
  .map(() => Array(w).fill('.'));

const displayCave = () => {
  for (const caveRow of cave) {
    console.log(caveRow.join(''));
  }
};

const getPosToArray = (pos: number[]) => {
  return [pos[0] - minX - 1, pos[1] - minY - 1];
};

const constructCave = () => {
  for (const points of lines) {
    for (let i = 1; i < points.length; i++) {
      const from = getPosToArray(points[i - 1]);
      const to = getPosToArray(points[i]);
      for (
        let x = Math.min(from[0], to[0]);
        x <= Math.max(from[0], to[0]);
        x++
      ) {
        cave[from[1]][x] = 'X';
      }
      for (
        let y = Math.min(from[1], to[1]);
        y <= Math.max(from[1], to[1]);
        y++
      ) {
        cave[y][from[0]] = 'X';
      }
    }
  }

  cave[0][sandFlowPosX] = '+';
};

const sandStep = () => {
  const sandPos = [sandFlowPosX, 0];

  while (true) {
    if (cave[sandPos[1] + 1] === undefined) {
      return JSON.stringify(sandPos);
    } else if (cave[sandPos[1] + 1][sandPos[0]] === '.') {
      sandPos[1] += 1;
    } else if (cave[sandPos[1] + 1][sandPos[0] - 1] === undefined) {
      return JSON.stringify(sandPos);
    } else if (cave[sandPos[1] + 1][sandPos[0] - 1] === '.') {
      sandPos[0] -= 1;
    } else if (cave[sandPos[1] + 1][sandPos[0] + 1] === undefined) {
      return JSON.stringify(sandPos);
    } else if (cave[sandPos[1] + 1][sandPos[0] + 1] === '.') {
      sandPos[0] += 1;
    } else {
      cave[sandPos[1]][sandPos[0]] = 'o';
      return JSON.stringify(sandPos);
    }
  }
};

constructCave();

let lastSandPos = sandStep();
let c = 0;

while (true) {
  const newSandPos = sandStep();
  if (newSandPos === lastSandPos) break;
  lastSandPos = newSandPos;
  // console.log(Array(w).fill('=').join(''));
  // displayCave();
  c++;
}
displayCave();

console.log(c);
