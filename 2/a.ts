const input = await Deno.readTextFile('input.txt');

type Hand = 'rock' | 'paper' | 'scisors';

const inputsRef = {
  //ROCK
  A: 'rock',
  X: 'rock',
  //PAPER
  B: 'paper',
  Y: 'paper',
  //SCISORS
  C: 'scisors',
  Z: 'scisors',
} as const;

const handScore = {
  rock: 1,
  paper: 2,
  scisors: 3,
} as const;

const beat = {
  rock: 'scisors',
  paper: 'rock',
  scisors: 'paper',
} as const;

const hands = input.split('\n').map((hand) => {
  const [left, right] = hand.split(' ') as (keyof typeof inputsRef)[];
  const handLeft = inputsRef[left] as Hand;
  const handRight = inputsRef[right] as Hand;

  let result = 0;

  if (beat[handRight] === handLeft) {
    result = handScore[handRight] + 6;
  } else if (beat[handLeft] === handRight) {
    result = handScore[handRight];
  } else {
    result = handScore[handRight] + 3;
  }

  console.log({
    handLeft,
    handRight,
    handScoreLeft: handScore[handLeft],
    handScoreRight: handScore[handRight],
    result,
  });

  return result;
});
console.log(hands);

console.log(hands.reduce((prev, current) => prev + current, 0));
