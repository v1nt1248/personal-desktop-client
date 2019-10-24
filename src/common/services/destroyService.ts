import { injectable } from 'inversify';
import { Subject } from 'rxjs';

@injectable()
export class DestroyService extends Subject<null> {
    public beforeDestroy() {
        this.next(null);
        this.complete();
    }
}
