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
import { Observable, Subject } from 'rxjs';
import cloneDeep from 'lodash.clonedeep';

export interface IDialogConfig {
    title?: string;
    content?: string;
    successButton?: string;
    cancelButton?: string;
}

export interface IDialogService {
    dialogConfig: IDialogConfig;
    opened: Observable<void>;
    closed: Observable<boolean>;
    open(config: IDialogConfig): void;
    close(value: boolean): void;
}

const dialogConfigDefault: IDialogConfig = {
    title: 'Title',
    content: 'Content',
    successButton: 'OK',
    cancelButton: 'Cancel',
};

@injectable()
export class DialogService implements IDialogService {
    public dialogConfig: IDialogConfig = cloneDeep(dialogConfigDefault);
    private open$: Subject<void> = new Subject();
    private close$: Subject<boolean> = new Subject();

    public get opened(): Observable<void> {
        return this.open$.asObservable();
    }

    public get closed(): Observable<boolean> {
        return this.close$.asObservable();
    }

    public open(config: IDialogConfig): void {
        this.dialogConfig = {
            ...config,
            ...cloneDeep(dialogConfigDefault),
        };
        this.open$.next(void 0);
    }

    public close(value: boolean): void {
        return this.close$.next(value);
    }
}
