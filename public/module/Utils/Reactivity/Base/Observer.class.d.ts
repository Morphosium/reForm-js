import { ISubject } from './ISubject';
import { IObserver } from "./IObserver";
/**
 * Basic observable structure for listening events
 */
export declare abstract class Observer<T = any> implements IObserver<T> {
    abstract update(subject: ISubject, param: T): void;
}
