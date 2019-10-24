/* tslint:disable:no-console */
import { Component, Inject } from 'vue-property-decorator';
import { takeUntil } from 'rxjs/operators';
import { DestroyObserver } from '@/common/services/destroyObserver';
import { VBtn } from 'vuetify/lib';
import { appStore } from '@/common/services/app-store';
import { appContactsStore } from '@/common/di';
import ContactList from '../contact-list/ContactList.vue';
import Person from '../person/Person.vue';
import cloneDeep from 'lodash.clonedeep';
import { createNewPerson } from '@/common/helpers';
import SERVICE_IDENTIFIER from '@/common/di/identifiers';
import { Container } from 'inversify';
import { IContactsFsService } from '@/app-contacts/services/contacts-fs.service';
import { IDialogService } from '@/common/components/dialog/dialog.service';

@Component({
  components: {
    'v-btn': VBtn,
    'contact-list': ContactList,
    'person': Person,
  },
})
export default class AppContacts extends DestroyObserver {
  public componentName: string = 'contact-list';
  public qtSelectedPersons: number|null = null;
  public person: IPerson|null = null;
  public personDisabled: boolean = false;

  public get editedMode(): boolean {
    return !!this.person;
  }

  @Inject(SERVICE_IDENTIFIER.CONTAINER)
  private container!: Container;

  private appContactsFsSrv!: IContactsFsService;
  private dialogService!: IDialogService;

  public created(): void {
    this.appContactsFsSrv = this.container.get<IContactsFsService>(SERVICE_IDENTIFIER.APPCONTACTSFSSRV);
    this.dialogService = this.container.get<IDialogService>(SERVICE_IDENTIFIER.DIALOGSRV);

    this.appContactsFsSrv.initFsData()
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe();
  }

  public mounted(): void {
    appContactsStore
      .change$
      .selectedContactsIds
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(res => this.qtSelectedPersons = res.length);

    appStore
      .change$
      .isRightSidebarOpen
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(state => {
        if (!state) {
          this.person = null;
        }
      });
  }

  public addNewContact(): void {
    console.log('Click add new contact!');
    // this.person = cloneDeep(createNewPerson());
    this.dialogService.open({
      title: 'Dialog title!',
      content: 'Qwerty, qwerty, qwerty',
    });
  }

  public onExit(): void {
    this.person = null;
  }

  public onSelect(data: Person[]): void {
    console.log('Selected persons: ', data);
  }

}
