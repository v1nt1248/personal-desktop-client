import { Vue } from 'vue-property-decorator';
import { Subject, Observable } from 'rxjs';

export class DestroyObserver extends Vue {
  private onDestroy: Subject<boolean> = new Subject();

  public get componentDestroyed(): Observable<boolean> {
    return this.onDestroy.asObservable();
  }

  public beforeDestroy(): void {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
