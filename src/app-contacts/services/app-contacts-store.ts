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
import cloneDeep from 'lodash.clonedeep';
import { getDefaultContactsView } from '@/common/constants';

interface IAppContactsState {
    contactList: Record<string, IPersonView>;
    editedPersonId: string|null;
    selectedContactsIds: string[];
}

export const appContactsStore = new BaseStore<IAppContactsState>();
export function appContactsStoreInitialization(): Promise<void> {
    return getDefaultContactsView()
        .then(contacts => {
            return new Promise(resolve => {
                appContactsStore.values.contactList = cloneDeep(contacts);
                appContactsStore.values.editedPersonId = null;
                appContactsStore.values.selectedContactsIds = [];
                resolve(void 0);
            });
        });
}
