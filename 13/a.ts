const input = await Deno.readTextFile('input.txt');

const groups = input.split('\n\n');

type DeepArray<T> = Array<T | DeepArray<T>>;

const pairs: DeepArray<number>[] = groups.map((pair) =>
  pair.split('\n').map((packet) => JSON.parse(packet))
);

const comparePair = (
  left: DeepArray<number> | number,
  right: DeepArray<number> | number
): boolean | 'continue' => {
  if (Number.isInteger(left) && Number.isInteger(right)) {
    if (left === right) return 'continue';
    return left < right;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < left.length && i < right.length; i++) {
      const value = comparePair(left[i], right[i]);

      if (value !== 'continue') {
        return value;
      }
    }

    if (left.length === right.length) return 'continue';
    return left.length < right.length;
  }

  if (Number.isInteger(left) || Number.isInteger(right)) {
    const list = (Number.isInteger(left) ? [left] : left) as number[];
    const other = (Number.isInteger(right) ? [right] : right) as number[];

    return comparePair(list, other);
  }

  return 'continue';
};

const rightPairs: number[] = [];

pairs.forEach((pair, idx) => {
  if (comparePair(pair[0], pair[1])) {
    rightPairs.push(idx + 1);
  }
});

console.log(rightPairs.reduce((prev, current) => prev + current, 0));
