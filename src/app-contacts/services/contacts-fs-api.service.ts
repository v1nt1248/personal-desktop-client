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
import { injectable } from 'inversify';
import {
    APPS,
    SYSTEM_FILES_NAMES,
    AppsId,
    getDefaultContactsView,
    AttemptsNumber,
} from '@/common/constants';
import { CommonFS } from '@/common/services/commonFS';
import { appContactsStore, appStore } from '@/common/di';
import { isEmptyObject } from '@/common/helpers';
import { Observable, from, of } from 'rxjs';
import { tap, map, catchError, retry } from 'rxjs/operators';
import { logError } from '@/common/libs/logging';

export interface IContactsFsApiService {
    getContactList(): Observable<Record<string, IPersonView>>;
    putContactList(contacts: Record<string, IPersonView>): Observable<void>;
    isContactPresenceOnFs(id: string): Observable<boolean>;
    getContact(id: string): Observable<IPerson|null>;
    putContact(contact: IPerson): Observable<void>;
}

@injectable()
export class ContactsFsApiService implements IContactsFsApiService {
    private appContactFS!: CommonFS<IPerson|null>;
    private appContactListFS!: CommonFS<Record<string, IPersonView>>;
    constructor() {
        const fsName = (APPS.find(app => app.id === AppsId.Contacts) as IAppInfo).fsName;

        this.appContactFS = new CommonFS<IPerson|null>(
            (w3n.storage as web3n.storage.Service).getAppSyncedFS(fsName),
            '',
            {
                info: { version: appStore.values.appVersion },
                data: null,
            },
        );

        getDefaultContactsView()
            .then(contacts => {
                this.appContactListFS = new CommonFS<Record<string, IPersonView>>(
                    (w3n.storage as web3n.storage.Service).getAppSyncedFS(fsName),
                    SYSTEM_FILES_NAMES.contactList,
                    {
                        info: { version: appStore.values.appVersion },
                        data: contacts,
                    },
                );
            });
    }

    public getContactList(): Observable<Record<string, IPersonView>> {
        return isEmptyObject(appContactsStore.values.contactList)
            ? from(this.appContactListFS.get())
                .pipe(
                    map(res => res.data),
                    tap(list => appContactsStore.values.contactList = list),
                )
            : of(appContactsStore.values.contactList);
    }

    public putContactList(contacts: Record<string, IPersonView>): Observable<void> {
        return from(this.appContactListFS.save({
            info: { version: appStore.values.appVersion },
            data: contacts,
        }))
        .pipe(
            retry(AttemptsNumber),
            catchError(err => {
                logError(err);
                return of(void 0);
            }),
        );
    }

    public getContact(id: string): Observable<IPerson|null> {
        return from(this.appContactFS.get(`${id}.json`))
            .pipe(
                map(res => res.data),
                retry(AttemptsNumber),
                catchError(err => {
                    logError(err);
                    return of(null);
                }),
            );
    }

    public putContact(contact: IPerson): Observable<void> {
        return from(
            this.appContactFS.save(
                {
                    info: { version: appStore.values.appVersion },
                    data: contact,
                },
                `${contact.id}.json`,
            ),
        )
            .pipe(
                retry(AttemptsNumber),
                catchError(err => {
                    logError(err);
                    return of(void 0);
                }),
            );
    }

    public delContact(id: string): Observable<void> {
        return from(this.appContactFS.delete(`${id}.json`))
            .pipe(
                retry(AttemptsNumber),
                catchError(err => {
                    logError(err);
                    return of(void 0);
                }),
            );
    }

    public isContactPresenceOnFs(id: string): Observable<boolean> {
        return from(this.appContactFS.checkFilePresence(`${id}.json`))
            .pipe(
                retry(AttemptsNumber),
                catchError(err => {
                    logError(err);
                    return of(false);
                }),
            );
    }

}
