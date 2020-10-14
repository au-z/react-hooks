declare module '@auzmartist/react-hooks/src/index' {
  import { DependencyList, Dispatch } from 'react';
  type ComputeFn<T> = (val: T, ...deps: any[]) => T;
  type AsyncComputeFn<T> = (val: T, ...deps: any[]) => Promise<T>;
  type AsyncEffectCallback = (unmounted: boolean) => Promise<(void | (() => void | undefined))>;
  /**
   * Creates a computed ref which will recompute when dependencies change. Dependencies are passed
   * to the fn parameter in the order that they are
   * passed to the deps parameter.
   * @param fn the compute function
   * @param deps useEffect style dependencies to trigger recompute
   */
  function useComputed<T>(fn: ComputeFn<T>, deps?: DependencyList): [T, Dispatch<T>];
  /**
   * Creates a computed ref which will execute the asynchronous computation upon any dependency changes.
   * Dependencies are passed to the fn parameter in the order that they are passed to the deps parameter.
   * @param fn the asynchronous compute function
   * @param deps useEffect style dependencies to trigger recompute
   * @param initial the initial value of the returned ref
   */
  function useComputedAsync<T>(fn: AsyncComputeFn<T>, deps?: DependencyList, initial?: T): [T, Dispatch<T>];
  /**
   * Wraps a common pattern of executing asynchronous code in a useEffect hook
   * @param fn the asynchronous compute function
   * @param deps useEffect style dependencies to trigger recompute
   */
  function useEffectAsync(fn: AsyncEffectCallback, deps?: DependencyList): void;
  export { useComputed, useComputedAsync, useEffectAsync, };

}
declare module '@auzmartist/react-hooks/test/useComputed.spec' {
  export {};

}
declare module '@auzmartist/react-hooks/test/useComputedAsync.spec' {
  export {};

}
declare module '@auzmartist/react-hooks/test/useEffectAsync.spec' {
  export {};

}
declare module '@auzmartist/react-hooks/test/utils' {
  export const sleep: (ms?: number) => Promise<unknown>;
  export const timeoutString: (str: string, delay: any) => Promise<string>;

}
declare module '@auzmartist/react-hooks' {
  import main = require('@auzmartist/react-hooks/src/index');
  export = main;
}