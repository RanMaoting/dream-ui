import { StoreKey } from '../interface/store';

export class Store {
  private store = new Map<keyof StoreKey, unknown>();
  public set<T extends keyof StoreKey>(key: T, value: StoreKey[T]) {
    return this.store.set(key, value);
  }
  public get<T extends keyof StoreKey>(
    key: T,
    defaultValue?: StoreKey[T]
  ): StoreKey[T] {
    const value = this.store.get(key);
    return (value as StoreKey[T]) ?? defaultValue;
  }
  public clear() {
    this.store.clear();
  }
  public size() {
    return this.store.size;
  }
}
