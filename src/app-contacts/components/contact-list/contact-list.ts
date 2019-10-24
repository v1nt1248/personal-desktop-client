import { Component, Emit } from 'vue-property-decorator';
import { DestroyObserver } from '@/common/services/destroyObserver';
import { VTextField } from 'vuetify/lib';
import { appStore } from '@/common/di';
import { takeUntil } from 'rxjs/operators';
import { getColorValue } from '@/common/helpers';

@Component({
  components: {
    'v-text-field': VTextField,
  },
})
export default class ContactList extends DestroyObserver {
  public colors: Record<string, string> = appStore.values.themeColors;
  public searchText: string = '';

  public created(): void {
    appStore
      .change$
      .setupSelected
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(() => {
        this.colors.azure = getColorValue('--azure');
      });
  }

  @Emit('select')
  public select(): void {
    console.log('Select'); // tslint:disable-line:no-console
  }
}
