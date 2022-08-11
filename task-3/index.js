var readlineSync = require("readline-sync");

const LEVELS = ["easy", "normal", "hard", "impossible"]; //уровни игры
let finishGame = true;
while (finishGame) {
  let levelIndex; //номер уровня игры
  let countOfDigits; //число цифр в числе
  let randomDigitsArray = []; //массив случайных цифр в числе
  let flagForGenerationFirstDigit = true; //флаг для цикла с генерацией первой цифры в числе
  let randomFirstDigit; //первая случайная цифра в числе
  let randomDigit; //случайная цифра в числе
  let winGameFlag = true;

  levelIndex = readlineSync.keyInSelect(LEVELS, "Which level?");
  if (levelIndex == -1) {
    console.log("Bye!");
    break;
  }
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
  let randomDigitsArrayAsSymbols = randomDigitsArray.map((item) =>
    String(item)
  );
  console.log(randomDigitsArrayAsSymbols);
  let randomNumberAsString = randomDigitsArrayAsSymbols.reduce(
    (sum, current) => sum + current,
    ""
  );
  console.log(randomNumberAsString);
  console.log(typeof randomNumberAsString);

  while (winGameFlag) {
    let digitsInPlace = [],
      digitsOutPlace = [];
    let estimatedNumberAsString = readlineSync.question("What is a number?\n");
    if (estimatedNumberAsString === randomNumberAsString) {
      winGameFlag = false;
      console.log("You've won!");
    } else {
      for (let digit of estimatedNumberAsString) {
        //если цифра из предсказанного числа есть в загаданном числе
        if (randomNumberAsString.indexOf(digit) !== -1) {
          //если индексы цифры предсказанного и загаданного числа совпадают
          if (
            randomNumberAsString.indexOf(digit) ===
            estimatedNumberAsString.indexOf(digit)
          )
            digitsInPlace.push(digit);
          //добавляем в массив с цифрами на своих местах
          else digitsOutPlace.push(digit); //добавляем в массив с цифрами не на своих местах
        }
      }
      console.log(
        `Matching numbers are out of place — ${digitsOutPlace.length} (${digitsOutPlace}), the numbers are in their places — ${digitsInPlace.length} (${digitsInPlace})`
      );
    }
  }
  if (!readlineSync.keyInYN("Shall we play some more?")) {
    console.log("Bye!");
    finishGame = false;
  }
}
