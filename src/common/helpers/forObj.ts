/**
 * функция проверки объекта на пустоту
 * @params obj {any}
 * @return {boolean}
 */
export function isEmptyObject<T extends object>(obj: T): boolean {
  return !obj || !Object.keys(obj).length;
}

/**
 * функция подсчета кол-ва записей в объекте (ассоциативном массиве)
 */
export function sizeObject(obj: any): number {
  return Object.keys(obj).length;
}

/**
 * функция получения массива используемых букв для списков контактов и групп контактов
 * @param data Record<string, Person>
 * @return {string[]} - массив используемых символов, отсортированный по алфавиту
 */
export function getAllLetters(data: Record<string, IPerson>): string[] {
  const result: string[] = [];
  Object.keys(data).forEach(id => {
    const currentLetter = data[id].name ?
      data[id].name[0].toLocaleUpperCase() :
      data[id].mails.length > 0 ?
        data[id].mails[0][0].toLocaleUpperCase() :
        ' ';
    if (result.indexOf(currentLetter) === -1) {
      result.push(currentLetter);
    }
  });
  return result.sort();
}
