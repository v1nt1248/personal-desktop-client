/* tslint:disable:no-console */
import { Component, Emit, Inject, Prop, Watch } from 'vue-property-decorator';
import { VBtn, VIcon, VForm, VTextarea, VTextField } from 'vuetify/lib';
import { DestroyObserver } from '@/common/services/destroyObserver';
import SERVICE_IDENTIFIER from '@/common/di/identifiers';
import { Container } from 'inversify';
import { appStore } from '@/common/services/app-store';
import ImageUploader from '@/common/components/image-uploader/ImageUploader.vue';
import cloneDeep from 'lodash.clonedeep';
import { IContactsFsService } from '@/app-contacts/services/contacts-fs.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  components: {
    'image-uploader': ImageUploader,
    'v-btn': VBtn,
    'v-icon': VIcon,
    'v-form': VForm,
    'v-textarea': VTextarea,
    'v-text-field': VTextField,
  },
})
export default class Person extends DestroyObserver {
  @Prop() public person: IPerson|null = null;
  @Prop() public disabled: boolean = false;

  public contact: IPerson|null = null;
  public colors: Record<string, string> = appStore.values.themeColors;
  public mailReg: RegExp = /[^@]+@[^@]+\.[^@]+/ui;
  public valid: boolean = true;

  @Inject(SERVICE_IDENTIFIER.CONTAINER)
  private container!: Container;

  private appContactsFsSrv!: IContactsFsService;

  public created(): void {
    this.appContactsFsSrv = this.container.get<IContactsFsService>(SERVICE_IDENTIFIER.APPCONTACTSFSSRV);
  }

  @Watch('person')
  public onPersonChange(val: IPerson, oldVal: IPerson): void {
    console.log(val);
    if (JSON.stringify(val) !== JSON.stringify(this.contact)) {
        this.contact = cloneDeep(val);
    }
  }

  @Emit('exit')
  public exit(): void {
    this.contact = null;
  }

  public startAction(action: 'mail'|'chat'|'delete'|'cancel'|'create'): void {
    switch (action) {
      case 'mail':
        console.log('Start create message!');
        break;
      case 'chat':
        console.log('Start create chat!');
        break;
      case 'delete':
        console.log('Start delete process!');
        break;
      case 'create':
        if (this.contact) {
          this.appContactsFsSrv
            .putContact(this.contact)
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(() => this.exit);
        }
        break;
      case 'cancel':
        this.exit();
        break;
    }
  }
}
