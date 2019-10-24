/* tslint:disable:member-ordering */
/*
 Copyright (C) 2018 3NSoft Inc.

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
import { Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';

export interface IBaseStore<T> {
  values: T;
  change$: { [field in keyof T]: Observable<T[field]> };
}

export class BaseStore<T extends object> implements IBaseStore<T> {
  private actualValues = {} as T;
  private actualChange$ = {} as {[field in keyof T]: {obs: Observable<T[field]>; subj: Subject<T[field]>}};

  public values = new Proxy(this.actualValues, {
    set: (target: T, field: keyof T, value: T[typeof field]): boolean => {
      if (target[field] !== value) {
        target[field] = value;
        if (this.actualChange$[field]) {
          this.actualChange$[field].subj.next(value);
        }
      }
      return true;
    },
  });

  public change$ = new Proxy(this.actualChange$, {
    get: (target: any, field: keyof T): any => {
      if (!this.actualChange$[field]) {
        const subj = new Subject<T[keyof T]>();
        this.actualChange$[field] = {
          obs: subj.asObservable().pipe(share()),
          subj,
        };
        target[field] = this.actualChange$[field];
      }
      return this.actualChange$[field].obs;
    },
    set: (target: any, field: keyof T, value: any): boolean => {
      return false;
    },
  }) as {[field in keyof T]: Observable<T[field]>};

}
