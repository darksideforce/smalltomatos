// src/@types/electron-store.d.ts
declare module 'electron-store' {
    interface Options<T> {
      defaults?: T;
      schema?: Record<string, unknown>;
    }
  
    class Store<T = object> {
      constructor(options?: Options<T>);
      set(key: string, value: unknown): void;
      get(key: string): unknown;
      has(key: string): boolean;
      delete(key: string): void;
    }
  
    export = Store;
  }