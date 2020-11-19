declare module '@auzmartist/react-hooks/src/index' {
  import { DependencyList } from 'react';
  type ComputeFn<T> = (val: T, ...deps: any[]) => T | Promise<T>;
  /**
   * Creates a computed ref which will recompute when dependencies change. Dependencies are passed
   * to the fn parameter in the order that they are
   * passed to the deps parameter.
   * @param fn the compute function
   * @param deps useEffect style dependencies to trigger recompute
   * @param initial the initial state value for async computed functions
   */
  function useComputed<T>(fn: ComputeFn<T>, deps?: DependencyList, initial?: T): T;
  export { useComputed, };

}
declare module '@auzmartist/react-hooks/test/useComputed.spec' {
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