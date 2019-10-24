import { MAIL_FOLDER_DEFAULT } from '@/common/constants';
import { appStore, appContactsStore } from '@/common/di';
import cloneDeep from 'lodash.clonedeep';

export function createNewMailFolderList(): Record<string, IMailFolder> {
  return cloneDeep(MAIL_FOLDER_DEFAULT);
}

/**
 * получение alias почтового адреса
 * @param address
 */
export function getAlias(address: string): string {
  if (address === appStore.values.user) {
    return 'Me';
  }
  let res: string = address;
  for (const id of Object.keys(appContactsStore.values.contactList)) {
    if (
      appContactsStore.values.contactList[id].mail.toLocaleLowerCase() === address.toLocaleLowerCase()
    ) {
      res = appContactsStore.values.contactList[id].name || appContactsStore.values.contactList[id].mail;
      break;
    }
  }
  return res;
}

/**
 * update содержимого списка папок на основании содержимого списка сообщений
 * @param mailFolderList
 * @param msgList
 */
export function checkMailFoldersForMessages(
  mailFolderList: Record<string, IMailFolder>,
  msgList: Record<string, MessageListItem>,
): Record<string, IMailFolder> {
  const mailFolderListUpdated = cloneDeep(mailFolderList);
  Object.keys(mailFolderListUpdated)
    .forEach(id => mailFolderListUpdated[id].messageKeys = []);
  for (const key of Object.keys(msgList)) {
    const currentMsgFolderId = msgList[key].folderId;
    if (!mailFolderListUpdated[currentMsgFolderId].messageKeys.includes(key)) {
      mailFolderListUpdated[currentMsgFolderId].messageKeys.push(key);
    }
  }
  return calcUnreadMsg(mailFolderListUpdated, msgList);
}

/**
 * функция расчета количества непрочитанных сообщений в mail folders
 */
function calcUnreadMsg(
  mailFolderList: Record<string, IMailFolder>,
  msgList: Record<string, MessageListItem>,
): Record<string, IMailFolder> {
  const res = cloneDeep(mailFolderList);
  for (const id of Object.keys(res)) {
    let qtUnread = 0;
    res[id].messageKeys
      .forEach(msgKey => {
        qtUnread = msgKey.indexOf('in') === 0 && !msgList[msgKey].isRead
          ? qtUnread + 1
          : qtUnread;
      });
    res[id].noReadQt = qtUnread;
  }
  return res;
}

/**
 * sanitize bodyHTML
 * @params html {string}
 * @return sanitized html {string}
 */
export function sanitizeHTML(source: string): string {
  const allowedElements = [
    'DIV',
    'P',
    'SPAN',
    'A',
    'IMG',
    'BR',
    'B',
    'I',
    'U',
    'S',
    'OL',
    'UL',
    'LI',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'STRONG',
    'EM',
    'SUB',
    'SUP',
    'CODE',
    'PRE',
    'BLOCKQUOTE',
  ];
  let allowedStyle: Record<string, string|null>;
  const wrapElem = document.createElement('section');
  wrapElem.innerHTML = source;
  const childElements = wrapElem.getElementsByTagName('*') as any as Element[];
  // удаление не разрешенных элементов
  for (const elem of childElements) {
    if (allowedElements.indexOf(elem.tagName) === -1) {
      elem.remove();
      continue;
    }

    allowedStyle = {
      'font-size': null,
      'font-family': null,
      'color': null,
      'background-color': null,
      'text-align': null,
    };
    // запоминаем значения разрешенных css свойств
    for (const key of Object.keys(allowedStyle)) {
      if ((elem as HTMLElement).style[key as any] !== '') {
        allowedStyle[key] = (elem as HTMLElement).style[key as any];
      }
    }
    // очищаем аттрибут style
    if (elem.hasAttribute('style')) {
      elem.setAttribute('style', '');
    }
    // восстанавливаем только разрешенные свойства style
    for (const key of Object.keys(allowedStyle)) {
      if (allowedStyle[key] !== null) {
        (elem as HTMLElement).style[key as any] = allowedStyle[key] as any;
      }
    }
    // для <a> удаляем все атрибуты кроме href
    // и добавляем аттрибут target="_blank"
    if (elem.tagName === 'A') {
      for (let i = 0; i < elem.attributes.length; i++) { //tslint:disable-line
        if (elem.attributes[i].name !== 'href') {
          elem.removeAttribute(elem.attributes[i].name);
        }
      }
      elem.setAttribute('target', '_blank');
    }
    // для <img> удаляем все атрибуты кроме src
    if (elem.tagName === 'IMG') {
      for (let i = 0; i < elem.attributes.length; i++) { //tslint:disable-line
        if (elem.attributes[i].name !== 'src') {
          elem.removeAttribute(elem.attributes[i].name);
        }
      }
    }
  }
  return wrapElem.innerHTML;
}
