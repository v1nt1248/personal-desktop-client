export function createNewPerson(): IPerson {
  return {
    id: 'new',
    name: '',
    mails: [''],
    phone: '',
    notice: '',
    photo: '',
    groupsIds: [],
    isConfirmed: true,
    isBlocked: false,
    labels: [],
  };
}

/**
 * выделение инициалов из названия контакта/группы
 * @param name {string}
 * @return {string}
 */
export function getInitials(name: string): string {
  const partName = name.split(' ');
  return partName.length === 1
    ? `${partName[0]} `.substr(0, 2)
    : partName[0][0] + partName[1][0];
}
