/* tslint:disable:object-literal-key-quotes */
let defaultContacts: Record<string, IPerson>;
let defaultContactsView: Record<string, IPersonView>;
export async function getDefaultContacts(): Promise<Record<string, IPerson>> {
    if (!defaultContacts) {
        const currentUser = await w3n.mail!.getUserId();
        defaultContacts = {
            '0': {
                id: '0',
                name: '3NSoft',
                mails: ['support@3nweb.com'],
                phone: '',
                notice: 'The 3NSoft support department.',
                photo: '',
                groupsIds: [],
                isConfirmed: true,
                isBlocked: false,
                labels: [],
            },
            '1': {
                id: '1',
                name: 'Me',
                mails: [currentUser],
                phone: '',
                notice: `It's me`,
                photo: '',
                groupsIds: [],
                isConfirmed: true,
                isBlocked: false,
                labels: [],
            },
        };
    }
    return defaultContacts;
}

export async function getDefaultContactsView(): Promise<Record<string, IPersonView>> {
    if (!defaultContactsView) {
        const currentUser = await w3n.mail!.getUserId();
        defaultContactsView = {
            '0': {
                id: '0',
                name: '3NSoft',
                mail: 'support@3nweb.com',
                preview: '',
                groupsIds: [],
                isConfirmed: true,
                isBlocked: false,
            },
            '1': {
                id: '1',
                name: 'Me',
                mail: currentUser,
                preview: '',
                groupsIds: [],
                isConfirmed: true,
                isBlocked: false,
            },
        };
    }
    return defaultContactsView;
}
