const input = await Deno.readTextFile('input.txt');

const moves = input.split('\n').map((line) => {
  const [dir, qt] = line.split(' ');

  return { dir, qt: parseInt(qt, 10) };
});

interface Pos {
  x: number;
  y: number;
}

const rope: Pos[] = Array.from({ length: 10 }, () => ({
  x: 0,
  y: 0,
}));

const tailPosHistory: { x: number; y: number }[] = [{ x: 0, y: 0 }];

const distance = (p1: Pos, p2: Pos) => {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
};

const getPosNearDistance = (p1: Pos, p2: Pos) => {
  const p3 = { x: p1.x, y: p1.y };
  let distToDest = distance(p2, p3);

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      const p4: Pos = { x: p1.x + x, y: p1.y + y };
      const distP4 = distance(p2, p4);
      if (distP4 < distToDest) {
        p3.x = p4.x;
        p3.y = p4.y;
        distToDest = distP4;
      }
    }
  }

  return p3;
};

// const displayBoard = (size: number) => {
//   for (let sY = size - 1; sY >= 0; sY--) {
//     let line = '';
//     for (let sX = 0; sX !== size; sX++) {
//       let added = false;

//       for (let i = 0; i !== rope.length; i++) {
//         if (rope[i].x === sX && rope[i].y === sY && added !== true) {
//           added = true;
//           line = `${line}${i === 0 ? 'H' : i}`;
//         }
//       }
//       if (!added) {
//         line = `${line}.`;
//       }
//     }
//     console.log(line);
//   }
// };

for (const move of moves) {
  let axis: 'x' | 'y' = 'x';
  let vec = 1;

  // console.log('MOVE', move);

  if (move.dir === 'R' || move.dir === 'L') {
    axis = 'x';
    if (move.dir === 'L') vec = -1;
  }

  if (move.dir === 'U' || move.dir === 'D') {
    axis = 'y';
    if (move.dir === 'D') vec = -1;
  }

  for (let i = 0; i !== move.qt; i++) {
    let headPos = rope[0];
    headPos[axis] += vec;
    for (let i = 1; i !== rope.length; i++) {
      const tailPos = rope[i];
      // console.log({ tailPos, headPos, d: distance(headPos, tailPos) });
      if (distance(headPos, tailPos) > 1.5) {
        const newPos = getPosNearDistance(tailPos, headPos);
        if (newPos) {
          tailPos.x = newPos.x;
          tailPos.y = newPos.y;
          if (i === rope.length - 1) tailPosHistory.push({ ...tailPos });
        }
      }
      headPos = rope[i];
    }
    // console.log('');
    // displayBoard(6);
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
