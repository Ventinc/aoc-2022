const input = await Deno.readTextFile('input.txt');

const forest = input
  .split('\n')
  .map((line) => line.split('').map((height) => parseInt(height, 10)));

const height = forest.length;
const width = forest[0].length;

const computeScenicScore = (y: number, x: number) => {
  const scenicScore = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };
  const treeHeight = forest[y][x];

  for (let l = x; l >= 0; l--) {
    if (l === x) continue;

    scenicScore.left++;

    if (forest[y][l] >= treeHeight) break;
  }

  for (let r = x; r < width; r++) {
    if (r === x) continue;

    scenicScore.right++;

    if (forest[y][r] >= treeHeight) break;
  }

  for (let t = y; t >= 0; t--) {
    if (t === y) continue;

    scenicScore.top++;

    if (forest[t][x] >= treeHeight) break;
  }

  for (let b = y; b < height; b++) {
    if (b === y) continue;

    scenicScore.bottom++;

    if (forest[b][x] >= treeHeight) break;
  }

  return (
    scenicScore.left * scenicScore.right * scenicScore.top * scenicScore.bottom
  );
};

let highestScenicScore = 0;

for (let row = 0; row !== height; row++) {
  for (let col = 0; col !== width; col++) {
    const treeScenicScore = computeScenicScore(row, col);
    if (highestScenicScore < treeScenicScore) {
      highestScenicScore = treeScenicScore;
    }
  }
}

console.log(highestScenicScore);
