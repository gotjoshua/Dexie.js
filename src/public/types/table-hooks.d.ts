import { DexieEventSet } from "./dexie-event-set";
import { DexieEvent } from "./dexie-event";
import { Transaction } from "./transaction";
import { IndexableType } from "./indexable-type";

interface CreatingHookContext<T,Key> {
  onsuccess?: (primKey: Key) => void;
  onerror?: (err: any) => void;
}

interface UpdatingHookContext<T,Key> {
  onsuccess?: (updatedObj: T) => void;
  onerror?: (err: any) => void;
}

interface DeletingHookContext<T,Key> {
  onsuccess?: () => void;
  onerror?: (err: any) => void;
}

export enum HookEvents {
  CREATE='creating',
  READ='reading',
  UPDATE='updating',
  DELETE='deleting'
}

interface TableHooks<T=any,TKey=IndexableType> extends DexieEventSet {
  (eventName: HookEvents.CREATE, subscriber: (this: CreatingHookContext<T,TKey>, primKey:TKey, obj:T, transaction:Transaction) => any): void;
  (eventName: HookEvents.READ, subscriber: (obj:T) => T | any): void;
  (eventName: HookEvents.UPDATE, subscriber: (this: UpdatingHookContext<T,TKey>, modifications:Object, primKey:TKey, obj:T, transaction:Transaction) => any): void;
  (eventName: HookEvents.DELETE, subscriber: (this: DeletingHookContext<T,TKey>, primKey:TKey, obj:T, transaction:Transaction) => any): void;
  creating: DexieEvent;
  reading: DexieEvent;
  updating: DexieEvent;
  deleting: DexieEvent;
}
