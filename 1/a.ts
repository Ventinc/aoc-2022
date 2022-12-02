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

console.log(Math.max(...allFoodCalorieCarryingByElves));
