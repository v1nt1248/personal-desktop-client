import { Container } from 'inversify';
import 'reflect-metadata';
import SERVICE_IDENTIFIER from './identifiers';
import { AppSetupFsService, IAppSetupFsService } from '@/common/components/app-setup/app-setup.service';
import { ContactsFsApiService, IContactsFsApiService } from '@/app-contacts/services/contacts-fs-api.service';
import { ContactsFsService, IContactsFsService } from '@/app-contacts/services/contacts-fs.service';
import { IDialogService, DialogService } from '@/common/components/dialog/dialog.service';

const container: Container = new Container();

container.bind<IAppSetupFsService>(SERVICE_IDENTIFIER.APPSETUPFSSRV)
    .to(AppSetupFsService).inSingletonScope();
container.bind<IContactsFsApiService>(SERVICE_IDENTIFIER.APPCONTACTSFSAPISRV)
    .to(ContactsFsApiService).inSingletonScope();
container.bind<IContactsFsService>(SERVICE_IDENTIFIER.APPCONTACTSFSSRV)
    .to(ContactsFsService).inSingletonScope();
container.bind<IDialogService>(SERVICE_IDENTIFIER.DIALOGSRV)
    .to(DialogService).inSingletonScope();

export default container;
