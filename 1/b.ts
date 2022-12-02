const input = await Deno.readTextFile('input.txt');

const foodCalories = input.split('\n');

const foodCaloriesPerElves: number[][] = [[]];

for (const foodCalorie of foodCalories) {
  if (foodCalorie.length === 0) {
    foodCaloriesPerElves.push([]);
    continue;
  }

  foodCaloriesPerElves[foodCaloriesPerElves.length - 1].push(
    Number(foodCalorie)
  );
}

const allFoodCalorieCarryingByElves = foodCaloriesPerElves.map(
  (foodCaloriesPerElve) => {
    return foodCaloriesPerElve.reduce((prev, current) => prev + current, 0);
  }
);

allFoodCalorieCarryingByElves.sort((a, b) => a - b);

const one = allFoodCalorieCarryingByElves.pop() as number;
const two = allFoodCalorieCarryingByElves.pop() as number;
const three = allFoodCalorieCarryingByElves.pop() as number;

console.log({ one, two, three });
console.log(one + two + three);
