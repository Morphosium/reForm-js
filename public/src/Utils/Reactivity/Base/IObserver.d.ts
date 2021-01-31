import { ISubject } from './ISubject';
export interface IObserver<T = any> {
    update(subject: ISubject, param: T): void;
}
//# sourceMappingURL=IObserver.d.ts.map