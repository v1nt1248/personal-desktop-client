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
import { AppsId } from '@/common/constants';
import { getColors } from '../helpers';

interface IAppState {
    appVersion: string;
    user: string;
    userStatus: UserStatus;
    isLoading: boolean;
    currentAppId: string;
    isRightSidebarOpen: boolean;
    isLeftSidebarOpen: boolean;
    themeColors: Record<string, string>;
    setupSelected: SetupFileData;
}

export const appStore = new BaseStore<IAppState>();
export function appStoreInitialization(): Promise<void> {
   return w3n.mail!.getUserId()
        .then(user => {
            return new Promise(resolve => {
                appStore.values.appVersion = '0.1.0';
                appStore.values.user = user;
                appStore.values.userStatus = { code: 200, description: 'user.status.connected' };
                appStore.values.isLoading = false;
                appStore.values.currentAppId = AppsId.Mail;
                appStore.values.isRightSidebarOpen = false;
                appStore.values.isLeftSidebarOpen = false;
                appStore.values.themeColors = getColors();
                appStore.values.setupSelected = {
                    language: 'en',
                    theme: 'default',
                };
                resolve(void 0);
            });
        });
}
