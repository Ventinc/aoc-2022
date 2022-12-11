const input = await Deno.readTextFile('input.txt');

const monkeysDesc = input.split('\n\n');

const operations = {
  '+': (a: number, b: number) => a + b,
  '*': (a: number, b: number) => a * b,
} as const;

type Monkey = {
  items: number[];
  operation: {
    sign: keyof typeof operations;
    value: string;
  };
  divisibleBy: number;
  valid: number;
  invalid: number;
  inspect: number;
};

const monkeys: Monkey[] = monkeysDesc.map((monkeyDesc) => {
  const monkeyDescLines = monkeyDesc.split('\n');

  monkeyDescLines.shift();

  const items: Monkey['items'] =
    monkeyDescLines
      .shift()
      ?.trim()
      .replace('Starting items: ', '')
      .split(', ')
      .map((itemString) => parseInt(itemString, 10)) ?? [];

  const operationArray: string[] =
    monkeyDescLines
      .shift()
      ?.trim()
      .replace('Operation: new = old ', '')
      .split(' ') ?? [];

  const operation: Monkey['operation'] = {
    sign: (operationArray?.[0] as Monkey['operation']['sign']) ?? '*',
    value: operationArray?.[1] ?? '0',
  };

  const divisibleBy = parseInt(
    monkeyDescLines.shift()?.trim().replace('Test: divisible by ', '') ?? '0',
    10
  );

  const valid = parseInt(
    monkeyDescLines.shift()?.trim().replace('If true: throw to monkey ', '') ??
      '0',
    10
  );
  const invalid = parseInt(
    monkeyDescLines.shift()?.trim().replace('If false: throw to monkey ', '') ??
      '0',
    10
  );

  return {
    items,
    operation,
    divisibleBy,
    valid,
    invalid,
    inspect: 0,
  };
});

const round = () => {
  for (let i = 0; i !== monkeys.length; i++) {
    const monkey = monkeys[i];
    while (monkey.items.length) {
      const item = monkey.items.shift() as number;

      monkey.inspect++;

      const newItemValue = Math.floor(
        operations[monkey.operation.sign](
          item,
          monkey.operation.value === 'old'
            ? item
            : parseInt(monkey.operation.value, 10)
        ) / 3
      );

      if (newItemValue % monkey.divisibleBy === 0) {
        monkeys[monkey.valid].items.push(newItemValue);
      } else {
        monkeys[monkey.invalid].items.push(newItemValue);
      }
    }
  }
};

for (let r = 0; r !== 20; r++) {
  round();
}

const [a, b] = monkeys.map((monkey) => monkey.inspect).sort((a, b) => b - a);

console.log(a * b);
