const input = await Deno.readTextFile('input.txt');

const moves = input.split('\n').map((line) => {
  const [dir, qt] = line.split(' ');

  return { dir, qt: parseInt(qt, 10) };
});

const headPos = { x: 0, y: 0 };
const tailPos = { x: 0, y: 0 };

const tailPosHistory: { x: number; y: number }[] = [{ x: 0, y: 0 }];

const isTailFar = () => {
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (tailPos.x === headPos.x + x && tailPos.y === headPos.y + y)
        return false;
    }
  }

  return true;
};

// const displayBoard = (size: number) => {
//   for (let sY = size - 1; sY >= 0; sY--) {
//     let line = '';
//     for (let sX = 0; sX !== size; sX++) {
//       if (headPos.x === sX && headPos.y === sY) {
//         line = `${line}H`;
//       } else if (tailPos.x === sX && tailPos.y === sY) {
//         line = `${line}T`;
//       } else {
//         line = `${line}.`;
//       }
//     }
//     console.log(line);
//   }
// };

for (const move of moves) {
  let axis: 'x' | 'y' = 'x';
  let vec = 1;

  if (move.dir === 'R' || move.dir === 'L') {
    axis = 'x';
    if (move.dir === 'L') vec = -1;
  }

  if (move.dir === 'U' || move.dir === 'D') {
    axis = 'y';
    if (move.dir === 'D') vec = -1;
  }

  for (let i = 0; i !== move.qt; i++) {
    headPos[axis] += vec;
    if (isTailFar()) {
      tailPos.x = headPos.x;
      tailPos.y = headPos.y;
      tailPos[axis] -= vec;
      tailPosHistory.push({ ...tailPos });
    }
  }
}

const countTailVisits = () => {
  const setPos = new Set();
  for (const oldTailPos of tailPosHistory) {
    setPos.add(`x${oldTailPos.x}-y${oldTailPos.y}`);
  }

  return setPos.size;
};

console.log(countTailVisits());
