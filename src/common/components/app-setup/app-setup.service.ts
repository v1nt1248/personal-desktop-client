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
import { FS_INFO_SERVICES, SYSTEM_FILES_NAMES } from '@/common/constants';
import { CommonFS } from '@/common/services/commonFS';
import { Observable, from } from 'rxjs';
import { appStore } from '@/common/di';
import { map, tap } from 'rxjs/operators';
import cloneDeep from 'lodash.clonedeep';

const DEFAULT_APP_CONFIG: SetupFileData = {
  language: 'en',
  theme: 'default',
};

export interface IAppSetupFsService {
  saveAppConfig: (data: SetupFileData) => Observable<void>;
  readAppConfig: () => Observable<SetupFileData>;
}

@injectable()
export class AppSetupFsService implements IAppSetupFsService {
  private appSetupFS: CommonFS<SetupFileData>;
  constructor() {
    const fsName = FS_INFO_SERVICES.config;
    this.appSetupFS = new CommonFS<SetupFileData>(
      (w3n.storage as web3n.storage.Service).getAppLocalFS(fsName),
      SYSTEM_FILES_NAMES.appConfig,
      {
        info: {
          version: appStore.values.appVersion,
        },
        data: DEFAULT_APP_CONFIG,
      },
    );
  }

  public saveAppConfig(data: SetupFileData): Observable<void> {
    return from(this.appSetupFS.save({
      info: { version: appStore.values.appVersion },
      data}));
  }

  public readAppConfig(): Observable<SetupFileData> {
    return from(this.appSetupFS.get())
      .pipe(
        map(res => res.data),
        tap(config => appStore.values.setupSelected = cloneDeep(config)),
      );
  }
}
