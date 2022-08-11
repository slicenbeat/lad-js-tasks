var readlineSync = require("readline-sync");
const LEVELS = ["easy", "normal", "hard", "impossible"]; //уровни игры
let finishGame = true; //флаг для игры
const NAME_OF_MOVES = [
  "Blow with a military censer",
  "Left heel spinner",
  "Canonical fireball",
  "Magic Block",
];
let userName = readlineSync.question("What is your name?\n");

let player = {
  moves: [
    {
      name: "Blow with a military censer",
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 50,
      cooldown: 0,
    },
    {
      name: "Left heel spinner",
      physicalDmg: 4,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 4,
    },
    {
      name: "Canonical fireball",
      physicalDmg: 0,
      magicDmg: 5,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
    },
    {
      name: "Magic Block",
      physicalDmg: 0,
      magicDmg: 0,
      physicArmorPercents: 100,
      magicArmorPercents: 100,
      cooldown: 4,
    },
  ],
};
const monster = {
  maxHealth: 10,
  name: "Fierce",
  moves: [
    {
      name: "A blow with a clawed paw",
      physicalDmg: 3, // физический урон
      magicDmg: 0, // магический урон
      physicArmorPercents: 20, // физическая броня
      magicArmorPercents: 20, // магическая броня
      cooldown: 0, // ходов на восстановление
    },
    {
      name: "Fiery breath",
      physicalDmg: 0,
      magicDmg: 4,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
    },
    {
      name: "Tail kick",
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 50,
      magicArmorPercents: 0,
      cooldown: 2,
    },
  ],
};
player.name = userName;

while (finishGame) {
  let levelCoefficient; //коэффициент уровня здоровья пользователя
  let winGameFlag = true; //флаг для итерации в игре. если кто-то победил, то убираем флаг.

  levelCoefficient = readlineSync.keyInSelect(LEVELS, "Which level?"); //выбор уровня игры
  if (levelCoefficient == -1) {
    console.log("Bye!");
    break;
  }
  player.maxHealth = 20 - 4 * levelCoefficient; // исходное здоровье пользователя

  initializeTheGame([monster, player]);
  let numberOfMove = 0;
  //игра
  while (winGameFlag) {
    numberOfMove += 1;
    console.log(`====== Number of move — ${numberOfMove} ======`);
    let monsterNumberOfMove = getNumberOfMove(monster);
    let playerNumberOfMove = getNumberOfMove(player);
    reduceTheNumberOfCooldown([monster, player]);
    makeHits(monster, player, monsterNumberOfMove, playerNumberOfMove);
    winGameFlag = checkHealth(monster, player);
  }

  //Игра закончилась. Повторим?
  if (!readlineSync.keyInYN("Shall we play some more?")) {
    console.log("Bye!");
    finishGame = false;
  }
}

//инициализация игры
function initializeTheGame(participants) {
  for (let participant of participants) {
    participant.currentHealth = participant.maxHealth;
    console.log(`${participant.name} health is ${participant.currentHealth}`);
    for (move of participant.moves) {
      move.currentCooldown = 0;
    }
  }
}
//уменьшаем кулдаун
function reduceTheNumberOfCooldown(participants) {
  for (let participant of participants) {
    for (move of participant.moves) {
      if (move.currentCooldown > 0) {
        move.currentCooldown -= 1;
      }
    }
  }
}

function getNumberOfMove(player) {
  let numberOfMove;
  let generatingNumberOfMoveFlag = true;
  if (player.moves.length === 3) {
    while (generatingNumberOfMoveFlag) {
      numberOfMove = Math.floor(Math.random() * player.moves.length); //генерация номера хода
      if (player.moves[numberOfMove].currentCooldown === 0) {
        console.log(
          `${player.name} selected "${player.moves[numberOfMove].name}"`
        );
        return numberOfMove;
      }
    }
  } else {
    while (generatingNumberOfMoveFlag) {
      numberOfMove = readlineSync.keyInSelect(
        NAME_OF_MOVES,
        "Which move will you choose?"
      ); //выбор уровня игры

      if (numberOfMove == -1) {
        console.log("No, no, it would be necessary to decide on the move!");
      } else if (player.moves[numberOfMove].currentCooldown === 0) {
        console.log(
          `${player.name} selected "${player.moves[numberOfMove].name}"`
        );
        return numberOfMove;
      } else {
        console.log("Cooldown weighs on this move, try to choose another one…");
      }
    }
  }
}
//проверяем, живы ли и кто выиграл
function checkHealth(monster, player) {
  console.log(
    `${monster.name}'s health — ${monster.currentHealth}, ${player.name}'s health — ${player.currentHealth}`
  );
  if (monster.currentHealth <= 0 && player.currentHealth <= 0) {
    console.log("There are no winners or losers");
    return false;
  } else if (monster.currentHealth <= 0) {
    console.log(`Winner is ${player.name}!`);
    return false;
  } else if (player.currentHealth <= 0) {
    console.log(`Winner is ${monster.name}!`);
    return false;
  } else return true;
}
//устраиваем битву
function makeHits(monster, player, monsterNumberOfMove, playerNumberOfMove) {
  monster.currentHealth =
    monster.currentHealth -
    (1 - monster.moves[monsterNumberOfMove].physicArmorPercents / 100) *
      player.moves[playerNumberOfMove].physicalDmg;
  monster.currentHealth =
    monster.currentHealth -
    (1 - monster.moves[monsterNumberOfMove].magicArmorPercents / 100) *
      player.moves[playerNumberOfMove].magicDmg;
  player.moves[playerNumberOfMove].currentCooldown +=
    player.moves[playerNumberOfMove].cooldown;

  player.currentHealth =
    player.currentHealth -
    (1 - player.moves[playerNumberOfMove].physicArmorPercents / 100) *
      monster.moves[monsterNumberOfMove].physicalDmg;
  player.currentHealth =
    player.currentHealth -
    (1 - player.moves[playerNumberOfMove].magicArmorPercents / 100) *
      monster.moves[monsterNumberOfMove].magicDmg;
  monster.moves[monsterNumberOfMove].currentCooldown +=
    monster.moves[monsterNumberOfMove].cooldown;
}
