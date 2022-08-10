var readlineSync = require("readline-sync");

const NUMBER_OF_ATTEMPTS = 5; //количество попыток
const LEVELS = ["easy", "normal", "hard", "impossible"]; //уровни игры
let levelIndex; //номер уровня игры
let countOfDigits; //число цифр в числе
let randomDigitsArray = []; //массив случайных цифр в числе
let flagForGenerationFirstDigit = true; //флаг для цикла с генерацией первой цифры в числе
let randomFirstDigit; //первая случайная цифра в числе
let randomDigit; //случайная цифра в числе

levelIndex = readlineSync.keyInSelect(LEVELS, "Which level?");
console.log("Ok, " + LEVELS[levelIndex] + " good.");
countOfDigits = levelIndex + 3;

//генерируем первую цифру в числе и добавляем в массив (главное, чтобы не ноль)
while (flagForGenerationFirstDigit) {
  randomFirstDigit = Math.floor(Math.random() * 9);
  if (randomFirstDigit !== 0) {
    randomDigitsArray.push(randomFirstDigit);
    flagForGenerationFirstDigit = false;
  }
}
//до конца заполняем массив случайными уникальными цифрами
while (randomDigitsArray.length < countOfDigits) {
  randomDigit = Math.floor(Math.random() * 9);
  if (randomDigitsArray.indexOf(randomDigit) === -1) {
    randomDigitsArray.push(randomDigit);
  }
}
let randomDigitsArrayAsSymbols = randomDigitsArray.map((item) => String(item));
console.log(randomDigitsArrayAsSymbols);
let randomNumberAsString = randomDigitsArrayAsSymbols.reduce(
  (sum, current) => sum + current,
  ""
);
console.log(randomNumberAsString);
console.log(typeof randomNumberAsString);