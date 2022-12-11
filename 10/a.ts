const input = await Deno.readTextFile('input.txt');

const lines = input.split('\n');

const commandCycles = {
  noop: 1,
  addx: 2,
} as const;

let X = 1;
let cycle = 1;
let result = 0;

const cyclesToDisplay = [20, 60, 100, 140, 180, 220];

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

while (commands.length) {
  const command = commands[0];

  command.cycleCount--;
  cycle++;
  if (command.cycleCount === 0) {
    if (command.name === 'addx') {
      // console.log(`${cycle}: ${X} + ${command.value}`);
      X += command.value;
    }
    commands.shift();
  }
  if (cyclesToDisplay.includes(cycle)) {
    console.log({
      cycle,
      X,
      value: X * cycle,
    });
    // console.log(command);

    result += X * cycle;
  }
}

console.log(result);
