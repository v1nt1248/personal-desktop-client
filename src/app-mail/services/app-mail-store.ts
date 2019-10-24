/*
 Copyright (C) 2019 3NSoft Inc.

 This program is free software: you can redistribute it and/or modify it under
 the terms of the GNU General Public License as published by the Free Software
 Foundation, either version 3 of the License, or (at your option) any later
 version.

 This program is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with
 this program. If not, see <http://www.gnu.org/licenses/>.
*/
import { BaseStore } from '@/common/libs/baseStore';
import { SYSTEM_MAIL_FOLDER_ID } from '@/common/constants';

interface IAppMailState {
    folderList: Record<string, IMailFolder>;
    selectedFolderId: string;
    messageList: Record<string, MessageListItem>;
    selectedMessagesKeys: string[];
    sendingStatus: SendingStatus | null;
    inboxRefreshTS: number;
}

export const appMailStore = new BaseStore<IAppMailState>();
export function appMailStoreInitialization(): Promise<void> {
    return new Promise(resolve => {
        appMailStore.values.folderList = {};
        appMailStore.values.selectedFolderId = SYSTEM_MAIL_FOLDER_ID.Inbox;
        appMailStore.values.messageList = {};
        appMailStore.values.selectedMessagesKeys = [];
        appMailStore.values.sendingStatus = null;
        appMailStore.values.inboxRefreshTS = 0;

        resolve(void 0);
    });
}
