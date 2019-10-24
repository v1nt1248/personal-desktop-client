/**
 * простейший валидатор mail адреса:
 * проверка на наличие символа "@" и присутствия текста
 * (строки) без пробелов после символа "@"
 * @param mail {string}
 * @return {boolean}
 */
export function checkAddress(mail: string): boolean {
  const m = mail.match(/@/g);
  const part2 = m && m.length === 1
    ? mail.split('@')[1]
    : '';
  return !!part2.length && part2.indexOf(' ') === -1;
}

/**
 * функция округления с заданной точностью
 * @param num {number} - округляемое число
 * @param precision {number} - точность округления (количество знаков после запятой
 * указывается со знаком "-")
 * @return {number} - скорректированная округленная десятичная дробь
 */
export function round(num: number, precision: number): number {
  // Сдвиг разрядов
  let tmpNum:any = num.toString().split('e'); //tslint:disable-line
  tmpNum = Math.round(+(tmpNum[0] + 'e' + (tmpNum[1] ? (+tmpNum[1] - precision) : -precision)));
  // Обратный сдвиг
  tmpNum = tmpNum.toString().split('e');
  return +(tmpNum[0] + 'e' + (tmpNum[1] ? (+tmpNum[1] -
  + precision) : precision));
}
