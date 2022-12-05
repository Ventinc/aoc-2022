const input = await Deno.readTextFile('input.txt');

const lines = input.split('\n');

const stocks: string[][] = [];
const moves: { from: number; to: number; size: number }[] = [];

let stockParsed = false;

for (const line of lines) {
  if (line.length === 0) {
    stockParsed = true;
    stocks.pop();
    continue;
  }

  if (!stockParsed) {
    const lineParsed = line.match(/.{1,3}(?: )?/g);

    if (lineParsed) {
      stocks.push(lineParsed.map((value) => value.trim()));
    }
  } else {
    const [_, sizeString, __, fromString, ___, toString] = line.split(' ');
    moves.push({
      size: parseInt(sizeString, 10),
      from: parseInt(fromString, 10),
      to: parseInt(toString, 10),
    });
  }
}

const stockRotated = stocks[0]
  .map((_val, index) => stocks.map((row) => row[index]).reverse())
  .map((stock) => stock.filter((value) => value.length > 0));

for (const move of moves) {
  for (let n = 0; n !== move.size; n++) {
    const crateToMove = stockRotated[move.from - 1].pop();
    if (crateToMove) stockRotated[move.to - 1].push(crateToMove);
  }
}

console.log(
  stockRotated
    .map((stockList) => stockList.pop())
    .join('')
    .replace(/\[|\]/g, '')
);
