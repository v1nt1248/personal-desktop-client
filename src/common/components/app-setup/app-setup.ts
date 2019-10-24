import { Component, Inject } from 'vue-property-decorator';
import cloneDeep from 'lodash.clonedeep';
import { DestroyObserver } from '@/common/services/destroyObserver';
import {
  VIcon,
  VBtn,
} from 'vuetify/lib';
import { takeUntil } from 'rxjs/operators';
import { appStore } from '@/common/di';
import ContactIcon from '@/common/components/contact-icon/ContactIcon.vue';
import { APP_SETUP_MENU } from './app-setup.config';
import { Container } from 'inversify';
import SERVICE_IDENTIFIER from '@/common/di/identifiers';
import { IAppSetupFsService } from './app-setup.service';

@Component({
  components: {
    'v-icon': VIcon,
    'v-btn': VBtn,
    'contact-icon': ContactIcon,
  },
})
export default class AppSetup extends DestroyObserver {
  public appVersion: string = appStore.values.appVersion;
  public user: {name: string; status: string} = {name: '', status: ''};
  public setupMenu: SetupMenuItem[] = cloneDeep(APP_SETUP_MENU);
  public selectedSetupMenuItemId: number = 1;
  public colors: Record<string, string> = appStore.values.themeColors;

  @Inject(SERVICE_IDENTIFIER.CONTAINER)
  private container!: Container;

  private appSetupService!: IAppSetupFsService;

  public created(): void {
    this.appSetupService = this.container.get<IAppSetupFsService>(SERVICE_IDENTIFIER.APPSETUPFSSRV);

    this.appSetupService.readAppConfig()
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(appConfig => {
        this.initAppSetupItem(appConfig);
      });

    this.user = {
      name: appStore.values.user,
      status: appStore.values.userStatus.description,
    };

    this.setSelectedSetupMenuItem();
    appStore
      .change$
      .setupSelected
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(async () => await this.setSelectedSetupMenuItem());
  }

  public getSelectedSetupMenuItem(id: number): SetupMenuItem|undefined {
    return this.setupMenu.find(item => item.id === id);
  }

  public closeApp(): void {
    w3n.closeSelf();
  }

  public selectSetupItem(item: SetupMenuItemValue): void {
    if (!!item && appStore.values.setupSelected[item.section] !== item.code) {
      switch (item.section) {
        case 'language':
          break;
        case 'theme':
          this.setTheme(item.code);
          break;
      }
      const tmpSetupSelected = cloneDeep(appStore.values.setupSelected);
      tmpSetupSelected[item.section] = item.code;
      appStore.values.setupSelected = cloneDeep(tmpSetupSelected);
    }
  }

  private async setSelectedSetupMenuItem(): Promise<void> {
    this.setupMenu.forEach(menu => {
      menu.value.forEach(item => item.isSelected = appStore.values.setupSelected[item.section] === item.code);
    });
    await this.appSetupService.saveAppConfig(appStore.values.setupSelected);
  }

  private setTheme(themeCode: string): void {
    const themeElement = document.querySelector('[data-theme]') as HTMLElement;
    themeElement.setAttribute('data-theme', themeCode);
  }

  private initAppSetupItem(appConfig: SetupFileData): void {
    const allSections = Object.keys(appConfig);
    allSections.forEach(section => {
      switch (section) {
        case 'language':
          break;
        case 'theme':
          this.setTheme(appConfig[section]);
          break;
      }
    });
  }
}
