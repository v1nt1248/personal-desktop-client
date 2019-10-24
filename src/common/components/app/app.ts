import { Component, Inject } from 'vue-property-decorator';
import { DestroyObserver } from '@/common/services/destroyObserver';
import SERVICE_IDENTIFIER from '@/common/di/identifiers';
import { Container } from 'inversify';
import { appStore } from '@/common/di';
import { AppsId, APPS } from '@/common/constants';
import { takeUntil } from 'rxjs/operators';
import { VNavigationDrawer } from 'vuetify/lib';

import AppMenu from '@/common/components/app-menu/AppMenu.vue';
import AppSetup from '../app-setup/AppSetup.vue';
import AppContacts from '@/app-contacts/components/app-contacts/AppContacts.vue';
import Dialog from '@/common/components/dialog/Dialog.vue';
import { IDialogService } from '../dialog/dialog.service';

const apps = [AppsId.Chat, AppsId.Mail];

@Component<App>({
    components: {
        'app-menu': AppMenu,
        'app-setup': AppSetup,
        'app-contacts': AppContacts,
        'v-navigation-drawer': VNavigationDrawer,
        'p-dialog': Dialog,
    },
})
export default class App extends DestroyObserver {
    public activeApp: string = appStore.values.currentAppId;
    public menusData: MenuNavItem[] = [];
    public isLeftSidebarOpen: boolean = appStore.values.isLeftSidebarOpen;
    public isRightSidebarOpen: boolean = appStore.values.isRightSidebarOpen;
    public isClosable: boolean = false;

    @Inject(SERVICE_IDENTIFIER.CONTAINER)
    private container!: Container;

    private dialogService!: IDialogService;

    public created(): void {
        this.dialogService = this.container.get<IDialogService>(SERVICE_IDENTIFIER.DIALOGSRV);

        this.menusData = apps.map(appId => {
            const appInfo = APPS.find(a => a.id === appId) as IAppInfo;
            return {
                appId,
                link: appInfo.stateName,
                icon: appInfo.icon,
                badgeInfo: '',
                isActive: appId === this.activeApp,
            };
        });

        if (appStore && appStore.values.currentAppId) {
            this.appSelect(appStore.values.currentAppId);
        }

        appStore
            .change$
            .currentAppId
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(appId => this.appSelect(appId));

        appStore
            .change$
            .isLeftSidebarOpen
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(status => this.isLeftSidebarOpen = status);

        appStore
            .change$
            .isRightSidebarOpen
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(status => {
                this.isRightSidebarOpen = status;
                console.log('R: ', this.isRightSidebarOpen); // tslint:disable-line:no-console
                if (status) {
                    setTimeout(() => this.isClosable = true, 50);
                } else {
                    this.isClosable = false;
                }
            });
    }

    public appSelect(appId: string): void {
        const selectedApp = this.menusData.find(item => item.appId === appId);
        this.menusData.forEach(item => item.isActive = item.appId === appId);
        this.$router.push(selectedApp!.link)
            .catch(err => {}); // tslint:disable-line:no-empty
    }

    public onChangeLeftSidebarStatus(status: boolean): void {
        if (appStore.values.isLeftSidebarOpen !== status) {
            appStore.values.isLeftSidebarOpen = status;
        }
    }

    public onChangeRightSidebarStatus(status: boolean): void {
        if (appStore.values.isRightSidebarOpen !== status) {
            appStore.values.isRightSidebarOpen = status;
        }
    }

    public qwe(): void {
        console.log('OUT'); // tslint:disable-line:no-console
        appStore.values.isRightSidebarOpen = false;
    }
}
