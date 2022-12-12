const input = await Deno.readTextFile('input.txt');

const mapInput = input.split('\n').map((line) => line.split(''));

interface Pos {
  x: number;
  y: number;
}

const charValue = (c: string) => {
  if (c === 'S') return 0;
  if (c === 'E') return 25;

  return c.charCodeAt(0) - 97;
};

const getStartAndFinish = (map: string[][]) => {
  let start: Pos = { x: 0, y: 0 };
  let finish: Pos = { x: 0, y: 0 };

  for (let y = 0; y !== map.length; y++) {
    for (let x = 0; x !== map[0].length; x++) {
      if (map[y][x] === 'S') start = { x, y };
      if (map[y][x] === 'E') finish = { x, y };
    }
  }

  return { start, finish };
};

const validNeighbors = (pos: Pos, map: string[][]) => {
  const connectedNeighbors: Pos[] = [
    { x: pos.x + 1, y: pos.y },
    { x: pos.x, y: pos.y + 1 },
    { x: pos.x - 1, y: pos.y },
    { x: pos.x, y: pos.y - 1 },
  ];

  const currentCell = map[pos.y][pos.x];
  const currentCellValue = charValue(currentCell);

  const validNodes = connectedNeighbors.filter(
    (node) =>
      node.y >= 0 &&
      node.y < map.length &&
      node.x >= 0 &&
      node.x < map[0].length &&
      (charValue(map[node.y][node.x]) <= currentCellValue ||
        charValue(map[node.y][node.x]) === currentCellValue + 1)
  );

  return validNodes;
};

const posToString = (p: Pos) => `${p.y}-${p.x}`;

const dijkstra = (from: Pos, to: Pos, map: string[][]) => {
  const mapH = map.length;
  const mapW = map[0].length;
  const visited = new Set();
  const distanceMap: number[][] = Array(mapH)
    .fill([])
    .map(() => Array(mapW).fill(Infinity));
  distanceMap[from.y][from.x] = 0;
  const queue: Pos[] = [from];
  visited.add(posToString(from));

  while (queue.length > 0) {
    const currentPos = queue.shift() as Pos;

    const neighbors = validNeighbors(currentPos, map);

    for (const neighbor of neighbors) {
      if (!visited.has(posToString(neighbor))) {
        visited.add(posToString(neighbor));
        distanceMap[neighbor.y][neighbor.x] =
          distanceMap[currentPos.y][currentPos.x] + 1;
        queue.push(neighbor);
      }
    }
  }

  return distanceMap[to.y][to.x];
};

const { start, finish } = getStartAndFinish(mapInput);

console.log(dijkstra(start, finish, mapInput));
