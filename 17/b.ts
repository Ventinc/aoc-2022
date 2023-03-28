const input = await Deno.readTextFile('input.txt');

const jets = input.split('');

const wide = 7;

const chamber = Array(4)
  .fill([])
  .map(() => Array(wide).fill('.'));

const rocks = [
  [['#', '#', '#', '#']],
  [
    ['.', '#', '.'],
    ['#', '#', '#'],
    ['.', '#', '.'],
  ],
  [
    ['#', '#', '#'],
    ['.', '.', '#'],
    ['.', '.', '#'],
  ],
  [['#'], ['#'], ['#'], ['#']],
  [
    ['#', '#'],
    ['#', '#'],
  ],
] as const;

type FallingRock = {
  x: number;
  y: number;
  shape: typeof rocks[number];
};

const displayChamber = (chamber: string[][], fallingRock: FallingRock) => {
  for (let y = chamber.length - 1; y >= 0; y--) {
    const row = Array(wide).fill('.');
    for (let x = 0; x !== row.length; x++) {
      if (chamber[y][x] === '#') row[x] = '#';
      else if (
        y >= fallingRock.y &&
        y < fallingRock.y + fallingRock.shape.length
      ) {
        if (
          x >= fallingRock.x &&
          x < fallingRock.x + fallingRock.shape[0].length
        ) {
          if (fallingRock.shape[y - fallingRock.y][x - fallingRock.x] === '#')
            row[x] = '@';
        }
      }
    }
    console.log(`|${row.join('')}|`);
  }
  console.log(`+${Array(7).fill('-').join('')}+`);
};

const updateChamber = (chamber: string[][], fallingRock: FallingRock) => {
  for (let y = chamber.length - 1; y >= 0; y--) {
    for (let x = 0; x !== wide; x++) {
      if (y >= fallingRock.y && y < fallingRock.y + fallingRock.shape.length) {
        if (
          x >= fallingRock.x &&
          x < fallingRock.x + fallingRock.shape[0].length
        ) {
          if (fallingRock.shape[y - fallingRock.y][x - fallingRock.x] === '#')
            chamber[y][x] = '#';
        }
      }
    }
  }
};

const lastRowFloor = () => {
  let idx = chamber.length - 1;

  while (chamber[idx]) {
    if (chamber[idx].includes('#')) break;
    idx--;
  }

  return idx + 4;
};

const collision = (chamber: string[][], fallingRock: FallingRock) => {
  if (fallingRock.y < 0) return true;
  if (fallingRock.x < 0 || fallingRock.x + fallingRock.shape[0].length > wide)
    return true;

  for (let y = 0; y !== fallingRock.shape.length; y++) {
    for (let x = 0; x !== fallingRock.shape[0].length; x++) {
      if (
        fallingRock.shape[y][x] === '#' &&
        chamber?.[fallingRock.y + y]?.[fallingRock.x + x] === '#'
      ) {
        return true;
      }
    }
  }

  return false;
};

let rockSwitch = 0;
let rock = 1;
let jetMove = 0;
const currentRock: FallingRock = {
  x: 2,
  y: lastRowFloor(),
  shape: rocks[rockSwitch],
};

const getXDirJetMove = (move: string) => {
  if (move === '<') {
    return -1;
  } else if (move === '>') {
    return 1;
  }
  return 0;
};

// const totalRocks = 2022;
const totalRocks = 100000;
let result = 0;

while (rock < totalRocks) {
  const dir = getXDirJetMove(jets[jetMove]);
  if (
    !collision(chamber, {
      ...currentRock,
      x: currentRock.x + dir,
    })
  )
    currentRock.x = currentRock.x + dir;
  jetMove = (jetMove + 1) % jets.length;

  // displayChamber(chamber, currentRock);

  // console.log('');

  if (
    collision(chamber, {
      ...currentRock,
      y: currentRock.y - 1,
    })
  ) {
    updateChamber(chamber, currentRock);
    rockSwitch = (rockSwitch + 1) % rocks.length;
    currentRock.y = lastRowFloor();
    for (let y = chamber.length - 1; y < currentRock.y; y++) {
      chamber.push(Array(wide).fill('.'));
    }

    while (chamber.length > 10000) {
      chamber.shift();
      result++;
    }
    currentRock.x = 2;
    currentRock.shape = rocks[rockSwitch];
    rock++;
  } else {
    currentRock.y--;
  }
}

console.log(result + lastRowFloor());
