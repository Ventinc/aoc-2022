const input = await Deno.readTextFile('input.txt');

const lines = input.split('\n').map((line) =>
  line
    .replace('Valve ', '')
    .replace(' has flow rate', '')
    .replace(/ tunnel(s)? lead(s)? to valve(s)? /, '')
);

const valvesInformations = lines.map((line) => line.split(';'));

interface Valve {
  name: string;
  rate: number;
  connections: Valve[];
}

const valves: Valve[] = valvesInformations.map(([valveValue]) => {
  const [name, rateString] = valveValue.split('=');

  return {
    name,
    rate: parseInt(rateString),
    connections: [],
  };
});

valvesInformations.forEach(([, valveConnections], idx) => {
  const valve = valves[idx];

  const connectionNames = valveConnections.split(', ');

  for (const connectionName of connectionNames) {
    const connectionValve = valves.find((v) => v.name === connectionName);

    if (connectionValve) valve?.connections.push(connectionValve);
  }

  valve.connections.sort((a, b) => b.rate - a.rate);
});

const floydWarshall = (valves: Valve[]): number[][] => {
  const n = valves.length;
  const graph = Array(n)
    .fill(0)
    .map(() => Array(n).fill(Infinity));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < valves[i].connections.length; j++) {
      const k = valves.indexOf(valves[i].connections[j]);
      graph[i][k] = 1;
    }
    graph[i][i] = 0;
  }

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (graph[i][k] + graph[k][j] < graph[i][j]) {
          graph[i][j] = graph[i][k] + graph[k][j];
        }
      }
    }
  }

  return graph;
};

const fw = floydWarshall(valves);

let best = -1;
const todo: {
  score: number;
  time: number;
  route: string[];
  current: Valve;
  positiveRates: Valve[];
}[] = [
  {
    score: 0,
    time: 0,
    route: ['AA'],
    current: valves.find((v) => v.name === 'AA') as Valve,
    positiveRates: valves.filter((v) => v.rate > 0),
  },
];

while (todo.length > 0) {
  const todoNow = todo.pop();
  if (todoNow) {
    const { score, time, route, positiveRates, current } = todoNow;
    best = Math.max(best, score);

    for (const connection of positiveRates) {
      const timeNeeded =
        time +
        fw[valves.findIndex((v) => v === connection)][
          valves.findIndex((v) => v === current)
        ] +
        1;

      if (timeNeeded < 30) {
        todo.push({
          score: score + (30 - timeNeeded) * connection.rate,
          time: timeNeeded,
          route: [...route, connection.name],
          current: connection,
          positiveRates: [...positiveRates].filter(
            (v) => v.name !== connection.name
          ),
        });
      }
    }
  }
}

console.log(best);
