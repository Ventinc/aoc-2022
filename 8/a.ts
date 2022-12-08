const input = await Deno.readTextFile('input.txt');

const forest = input
  .split('\n')
  .map((line) => line.split('').map((height) => parseInt(height, 10)));

const height = forest.length;
const width = forest[0].length;

const isVisible = (y: number, x: number) => {
  const treeHeight = forest[y][x];
  const visibility = {
    left: true,
    right: true,
    top: true,
    bottom: true,
  };

  for (let v = 0; v !== height; v++) {
    if (v === y) {
      continue;
    }

    if (forest[v][x] >= treeHeight) {
      if (v < y) {
        visibility.top = false;
      } else {
        visibility.bottom = false;
      }
    }
  }

  for (let h = 0; h !== width; h++) {
    if (h === x) {
      continue;
    }

    if (forest[y][h] >= treeHeight) {
      if (h < x) {
        visibility.left = false;
      } else {
        visibility.right = false;
      }
    }
  }

  // console.log({ x, y, treeHeight, visibility });

  return (
    visibility.bottom || visibility.top || visibility.right || visibility.left
  );
};

let visibleTrees = 0;

for (let row = 0; row !== height; row++) {
  for (let col = 0; col !== width; col++) {
    if (isVisible(row, col)) {
      visibleTrees++;
    }
  }
}

console.log(visibleTrees);
