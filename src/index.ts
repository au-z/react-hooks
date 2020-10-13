import {useEffect, DependencyList, useRef, MutableRefObject} from 'react'

type ComputeFn<T> = (...deps: any[]) => T

/**
 * Creates a computed ref which will recompute when dependencies change.
 * Dependencies are passed to the fn parameter in the order that they are
 * passed to the deps parameter.
 * @param fn the compute function
 * @param deps useEffect style dependencies to trigger recompute
 */
function useComputed<T>(fn: ComputeFn<T>, deps?: DependencyList): MutableRefObject<T> {
	const ref = useRef<T>()
	useEffect(() => {
		ref.current = fn(...deps)
	}, deps)

	return ref
}

/**
 * Creates a computed ref which will execute the asynchronous computation
 * upon any dependency changes. Dependencies are passed to the fn parameter
 * in the order that they are passed to the deps parameter.
 * @param fn the asynchronous compute function
 * @param deps useEffect style dependencies to trigger recompute
 * @param initial the initial value of the returned ref
 */
function useComputedAsync<T>(fn: ComputeFn<Promise<T>>, deps?: DependencyList, initial?: T): MutableRefObject<T> {
	const ref = useRef<T>(initial)
	useEffect(() => {
		const recompute = async () => {
			ref.current = await fn(...deps)
		}
		recompute()
	}, deps)

	return ref
}

/**
 * Wraps a common pattern of executing asynchronous code in a useEffect hook
 * @param fn the asynchronous compute function
 * @param deps useEffect style dependencies to trigger recompute
 */
function useEffectAsync<T>(fn: ComputeFn<Promise<T>>, deps?: DependencyList) {
	return useEffect(() => {
		(() => fn(...deps))()
	}, deps)
}


export {
	useComputed,
	useComputedAsync,
	useEffectAsync,
}