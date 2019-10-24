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
import { injectable, inject } from 'inversify';
import { Observable, of, from, zip } from 'rxjs';
import SERVICE_IDENTIFIER from '@/common/di/identifiers';
import { appContactsStore } from './app-contacts-store';
import { IContactsFsApiService } from './contacts-fs-api.service';
import { switchMap, map } from 'rxjs/operators';
import { personToView } from '../helpers';
import cloneDeep from 'lodash.clonedeep';
import { getDefaultContacts } from '@/common/constants';

export interface IContactsFsService {
    initFsData(): Observable<void>;
    getContactList(): Observable<void>;
    putContactList(contactList: Record<string, IPersonView>): Observable<void>;
    getContact(id: string): Observable<IPerson|null>;
    putContact(contact: IPerson): Observable<void>;
}

@injectable()
export class ContactsFsService implements IContactsFsService {
    constructor(
        @inject(SERVICE_IDENTIFIER.APPCONTACTSFSAPISRV) private contactsFsSrv: IContactsFsApiService,
    ) {}

    public initFsData(): Observable<void> {
        return zip(
            this.contactsFsSrv.isContactPresenceOnFs('0'),
            this.contactsFsSrv.isContactPresenceOnFs('1'),
        )
            .pipe(
                switchMap(presence =>
                    presence[0] && presence[1]
                        ? of(void 0)
                        : this.continueInitFsData(),
                ),
            );
    }

    public getContactList(): Observable<void> {
        return this.contactsFsSrv.getContactList()
            .pipe(switchMap(() => of(void 0)));
    }

    public putContactList(contactList: Record<string, IPersonView>): Observable<void> {
        return this.contactsFsSrv.putContactList(contactList);
    }

    public getContact(id: string): Observable<IPerson|null> {
        return this.contactsFsSrv.getContact(id);
    }

    public putContact(contact: IPerson): Observable<void> {
        if (contact.id === 'new') {
            contact.id = `${Date.now()}`;
        }
        return this.contactsFsSrv.putContact(contact)
            .pipe(
                switchMap(() => from(personToView(contact))),
                switchMap(contactView => {
                    const tmpList = cloneDeep(appContactsStore.values.contactList);
                    tmpList[contactView.id] = contactView;
                    appContactsStore.values.contactList = tmpList;
                    return this.contactsFsSrv.putContactList(appContactsStore.values.contactList);
                }),
            );
    }

    private continueInitFsData(): Observable<void> {
        return from(getDefaultContacts())
            .pipe(
                map(contacts => Object.keys(contacts).map(id => contacts[id])),
                switchMap(contacts => this.completeInitFsData(contacts)),
            );
    }

    private completeInitFsData(contacts: IPerson[]): Observable<void> {
        return zip(
            this.putContact(contacts[0]),
            this.putContact(contacts[1]),
        )
        .pipe(switchMap(() => of(void 0)));
    }
}
