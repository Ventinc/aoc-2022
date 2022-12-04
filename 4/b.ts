const input = await Deno.readTextFile('input.txt');

const lines = input.split('\n');

let totalRangeOverlap = 0;

lines.map((line) => {
  const [rangeLeft, rangeRight] = line.split(',');

  const [rangeLeftStart, rangeLeftEnd] = rangeLeft
    .split('-')
    .map((num) => parseInt(num, 10));
  const [rangeRightStart, rangeRightEnd] = rangeRight
    .split('-')
    .map((num) => parseInt(num, 10));

  if (
    (rangeLeftStart <= rangeRightStart && rangeLeftEnd >= rangeRightEnd) ||
    (rangeRightStart <= rangeLeftStart && rangeRightEnd >= rangeLeftEnd) ||
    (rangeLeftStart >= rangeRightStart && rangeLeftStart <= rangeRightEnd) ||
    (rangeLeftEnd >= rangeRightStart && rangeLeftEnd <= rangeRightEnd) ||
    (rangeRightStart >= rangeLeftStart && rangeRightStart <= rangeLeftEnd) ||
    (rangeRightEnd >= rangeLeftStart && rangeRightEnd <= rangeLeftEnd)
  ) {
    totalRangeOverlap++;
  }
});

console.log({ totalRangeOverlap });
