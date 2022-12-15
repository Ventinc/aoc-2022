const input = await Deno.readTextFile('input.txt');

const rowToCheck = 2000000;

const lines = input.split('\n').map((line) =>
  line
    .replace('Sensor at ', '')
    .replace(' closest beacon is at ', '')
    .replace(/(x=|y=| )/g, '')
);

const manhattanDistance = (p1: number[], p2: number[]) => {
  return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
};

interface Sensor {
  pos: number[];
  beacon: number[];
  distance: number;
}

let minX = 0;
let minY = 0;
let maxX = 0;
let maxY = 0;

const sensors: Sensor[] = lines.map((line) => {
  const [posSensor, posBeacon] = line.split(':');

  const pos = JSON.parse(`[${posSensor}]`);
  const beacon = JSON.parse(`[${posBeacon}]`);

  if (Math.min(pos[0], beacon[0]) < minX) minX = Math.min(pos[0], beacon[0]);
  if (Math.max(pos[0], beacon[0]) > maxX) maxX = Math.max(pos[0], beacon[0]);
  if (Math.min(pos[1], beacon[1]) < minY) minY = Math.min(pos[1], beacon[1]);
  if (Math.max(pos[1], beacon[1]) > maxY) maxY = Math.max(pos[1], beacon[1]);

  return {
    pos,
    beacon,
    distance: manhattanDistance(pos, beacon),
  };
});

// console.log(sensors);

const inSensorRange = (pos: number[]) => {
  for (const sensor of sensors) {
    if (manhattanDistance(sensor.pos, pos) <= sensor.distance) {
      return true;
    }
  }

  return false;
};

const isBeacon = (pos: number[]) => {
  for (const sensor of sensors) {
    if (sensor.beacon[0] === pos[0] && sensor.beacon[1] === pos[1]) {
      return true;
    }
  }

  return false;
};

const row = Array(maxX - minX).fill('.');

let result = 0;

const w = maxX - minX;
const larger = w;

for (let x = minX - larger; x < maxX + larger; x++) {
  if (inSensorRange([x, rowToCheck]) && !isBeacon([x, rowToCheck])) {
    row[x - minX] = '#';
    result++;
  }

  if (isBeacon([x, rowToCheck])) {
    row[x - minX] = 'B';
  }
}

// console.log(row.join(''));

console.log(result);
// 5147333
