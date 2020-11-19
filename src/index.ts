import {useEffect, DependencyList, useState} from 'react'

type ComputeFn<T> = (val: T, ...deps: any[]) => T | Promise<T>

/**
 * Creates a computed ref which will recompute when dependencies change. Dependencies are passed
 * to the fn parameter in the order that they are
 * passed to the deps parameter.
 * @param fn the compute function
 * @param deps useEffect style dependencies to trigger recompute
 * @param initial the initial state value for async computed functions
 */
function useComputed<T>(fn: ComputeFn<T>, deps?: DependencyList, initial?: T): T {
	const [val, set] = useState<T>(initial)
	useEffect(() => {
		const compute = fn(val, ...deps)
		if(!!compute && typeof (compute as any).then === 'function') {
			(compute as Promise<T>).then((computed: T) => set(computed))
		} else {
			set(compute as T)
		}
	}, deps)

	return val
}

export {
	useComputed,
}