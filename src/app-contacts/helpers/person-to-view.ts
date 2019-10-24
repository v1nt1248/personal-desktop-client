import { resizeImage } from '@/common/helpers';

export async function personToView(contact: IPerson): Promise<IPersonView> {
    return {
        id: contact.id,
        name: contact.name,
        mail: contact.mails[0],
        preview: contact.photo ? await resizeImage(contact.photo, 40) : '',
        groupsIds: contact.groupsIds,
        isConfirmed: contact.isConfirmed,
        isBlocked: contact.isBlocked,
    };
}
