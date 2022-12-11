const input = await Deno.readTextFile('input.txt');

const lines = input.split('\n');

const commandCycles = {
  noop: 1,
  addx: 2,
} as const;

let X = 1;
let cycle = 0;
const w = 40;
const h = 6;

const spriteLine = Array(w).fill('.');
spriteLine[0] = 'X';
spriteLine[1] = 'X';
spriteLine[2] = 'X';
const screen: string[][] = [];

for (let i = 0; i !== h; i++) {
  screen.push(Array(w).fill('.'));
}

type Command = {
  name: keyof typeof commandCycles;
  value: number;
  cycleCount: number;
};

const commands: Command[] = lines.map((line) => {
  const [command, value] = line.split(' ');

  if (command === 'noop') {
    return {
      name: 'noop',
      value: 0,
      cycleCount: commandCycles.noop,
    };
  }

  return {
    name: 'addx',
    value: parseInt(value, 10),
    cycleCount: commandCycles.addx,
  };
});

const cycleToPos = () => {
  return { x: cycle % 40, y: Math.floor(cycle / 40) };
};

while (commands.length && cycle !== w * h) {
  const command = commands[0];

  const p = cycleToPos();

  if (spriteLine[p.x] === 'X') {
    screen[p.y][p.x] = 'X';
  }

  command.cycleCount--;
  cycle++;
  if (command.cycleCount === 0) {
    if (command.name === 'addx') {
      X += command.value;
      spriteLine.fill('.');
      if (spriteLine[X - 1]) spriteLine[X - 1] = 'X';
      if (spriteLine[X]) spriteLine[X] = 'X';
      if (spriteLine[X + 1]) spriteLine[X + 1] = 'X';
    }
    commands.shift();
  }
}

screen.map((screenLine) => {
  console.log(screenLine.join(''));
});
