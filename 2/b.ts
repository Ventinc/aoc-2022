const input = await Deno.readTextFile('input.txt');

type Hand = 'rock' | 'paper' | 'scisors';
type Result = 'lose' | 'draw' | 'win';

const inputsRef = {
  //ROCK
  A: 'rock',
  X: 'lose',
  //PAPER
  B: 'paper',
  Y: 'draw',
  //SCISORS
  C: 'scisors',
  Z: 'win',
} as const;

const handScore = {
  rock: 1,
  paper: 2,
  scisors: 3,
} as const;

const lose = {
  rock: 'paper',
  paper: 'scisors',
  scisors: 'rock',
} as const;

const beat = {
  rock: 'scisors',
  paper: 'rock',
  scisors: 'paper',
} as const;

const hands = input.split('\n').map((hand) => {
  const [left, right] = hand.split(' ') as (keyof typeof inputsRef)[];
  const handLeft = inputsRef[left] as Hand;
  const resultToHave = inputsRef[right] as Result;

  let result = 0;

  if (resultToHave === 'draw') {
    result = handScore[handLeft] + 3;
  } else if (resultToHave === 'lose') {
    result = handScore[beat[handLeft]];
  } else {
    result = handScore[lose[handLeft]] + 6;
  }

  console.log({
    handLeft,
    resultToHave,
    handScoreLeft: handScore[handLeft],
    handScoreRight: handScore[lose[handLeft]],
    result,
  });

  return result;
});
console.log(hands);

console.log(hands.reduce((prev, current) => prev + current, 0));
