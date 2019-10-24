
export const AttemptsNumber: number = 3;

export const AppsId: Record<string, string> = {
  Chat: '0',
  Mail: '1',
  Storage: '2',
  Contacts: '3',
};

export const APPS: IAppInfo[] = [
  {
    id: AppsId.Chat,
    nameKey: 'app.menu.title.chat',
    icon: 'chat',
    stateName: 'app-chat',
    fsName: 'computer.3nweb.chat',
    disabled: false,
  },
  {
    id: AppsId.Mail,
    nameKey: 'app.menu.title.mail',
    icon: 'mail_outline',
    stateName: 'app-mail',
    fsName: 'computer.3nweb.mail',
    disabled: false,
  },
  {
    id: AppsId.Storage,
    nameKey: 'app.menu.title.storage',
    icon: '',
    stateName: 'app-storage',
    fsName: 'computer.3nweb.storage',
    disabled: true,
  },
  {
    id: AppsId.Contacts,
    nameKey: 'app.menu.title.contacts',
    icon: '',
    stateName: '',
    fsName: 'computer.3nweb.contacts',
    disabled: false,
  },
];
