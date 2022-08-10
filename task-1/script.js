function changeTheNameOfTheDaysOfTheWeek(exampleString) {
  return exampleString
    .replaceAll("ПОНЕДЕЛЬНИК", "MONDAY")
    .replaceAll("ВТОРНИК", "TUESDAY")
    .replaceAll("СРЕДА", "WEDNESDAY")
    .replaceAll("ЧЕТВЕРГ", "THURSDAY")
    .replaceAll("ПЯТНИЦА", "FRIDAY")
    .replaceAll("СУББОТА", "SATARDAY")
    .replaceAll("ВОСКРЕСЕНЬЕ", "SUNDAY");
}

let str = `Старший братец ПОНЕДЕЛЬНИК –
работяга, не бездельник.
Он неделю открывает
всех трудиться зазывает.

ВТОРНИК следует за братом
у него идей богато.

А потом СРЕДА-сестрица,
не пристало ей лениться.

Брат ЧЕТВЕРГ и так, и сяк,
он мечтательный чудак.

ПЯТНИЦА-сестра сумела
побыстрей закончить дело.

Предпоследний брат СУББОТА
не выходит на работу.

В гости ходит ВОСКРЕСЕНЬЕ,
очень любит угощенье
`;
console.log(changeTheNameOfTheDaysOfTheWeek(str));
