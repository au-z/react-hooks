import {useEffect, DependencyList, useState, Dispatch} from 'react'

type ComputeFn<T> = (val: T, ...deps: any[]) => T
type AsyncComputeFn<T> = (val: T, ...deps: any[]) => Promise<T>

// adds unmounted flag to EffectCallback
type AsyncEffectCallback = (unmounted: boolean) => Promise<(void | (() => void | undefined))>

/**
 * Creates a computed ref which will recompute when dependencies change. Dependencies are passed
 * to the fn parameter in the order that they are
 * passed to the deps parameter.
 * @param fn the compute function
 * @param deps useEffect style dependencies to trigger recompute
 */
function useComputed<T>(fn: ComputeFn<T>, deps?: DependencyList): [T, Dispatch<T>] {
	const [val, set] = useState<T>(null)
	useEffect(() => {
		set((current) => fn(current, ...deps))
	}, deps)

	return [val, set]
}

/**
 * Creates a computed ref which will execute the asynchronous computation upon any dependency changes.
 * Dependencies are passed to the fn parameter in the order that they are passed to the deps parameter.
 * @param fn the asynchronous compute function
 * @param deps useEffect style dependencies to trigger recompute
 * @param initial the initial value of the returned ref
 */
function useComputedAsync<T>(fn: AsyncComputeFn<T>, deps?: DependencyList, initial?: T): [T, Dispatch<T>] {
	let unmounted = false
	const [val, set] = useState<T>(initial)
	useEffect(() => {
		(async () => {
			fn(val, ...deps).then((computed: any) => !unmounted && set(computed))
		})()
		return () => {unmounted = true}
	}, deps)

	return [val, set]
}

/**
 * Wraps a common pattern of executing asynchronous code in a useEffect hook
 * @param fn the asynchronous compute function
 * @param deps useEffect style dependencies to trigger recompute
 */
function useEffectAsync(fn: AsyncEffectCallback, deps?: DependencyList) {
	let unmounted = false
	return useEffect(() => {
		(() => fn(unmounted))()
		return () => {unmounted = true}
	}, deps)
}


export {
	useComputed,
	useComputedAsync,
	useEffectAsync,
}