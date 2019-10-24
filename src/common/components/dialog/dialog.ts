import { Component, Inject } from 'vue-property-decorator';
import { DestroyObserver } from '@/common/services/destroyObserver';
import SERVICE_IDENTIFIER from '@/common/di/identifiers';
import { Container } from 'inversify';
import { IDialogService, IDialogConfig } from './dialog.service';
import {
    VBtn,
    VDialog,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
} from 'vuetify/lib';
import { takeUntil } from 'rxjs/operators';
import { appStore } from '@/common/di';

@Component({
    components: {
        'v-btn': VBtn,
        'v-dialog': VDialog,
        'v-card': VCard,
        'v-card-title': VCardTitle,
        'v-card-text': VCardText,
        'v-card-actions': VCardActions,
    },
})
export default class Dialog extends DestroyObserver {
    public isOpen: boolean = false;
    public dialogConfig!: IDialogConfig;
    public colors: Record<string, string> = appStore.values.themeColors;

    public dialogService!: IDialogService;

    @Inject(SERVICE_IDENTIFIER.CONTAINER)
    private container!: Container;

    public created(): void {
        this.dialogService = this.container.get<IDialogService>(SERVICE_IDENTIFIER.DIALOGSRV);
    }

    public mounted(): void {
        this.dialogService.opened
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(() => {
                this.isOpen = true;
            });

        this.dialogService.closed
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(() => this.isOpen = false);
    }

    public setDialogResponse(value: boolean, event: MouseEvent): void {
        event.stopImmediatePropagation();
        this.dialogService.close(value);
    }

}
