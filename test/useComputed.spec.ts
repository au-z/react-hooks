import {renderHook} from '@testing-library/react-hooks'
import {useComputed} from 'src/index'

const resolve = <T>(val: T, delay: number = 0) => new Promise<T>((res) => {
	setTimeout(() => res(val), delay)
})

test('creates a basic state', () => {
	const {result} = renderHook(() => useComputed(() => 'bar', []))
	expect(result.current).toBe('bar')
})

test('waits for async functions', async () => {
	const {result, waitForNextUpdate} = renderHook(() => {
		return useComputed(() => resolve('bar'), [], 'foo')
	})
	expect(result.current).toBe('foo')

	await waitForNextUpdate()
	expect(result.current).toBe('bar')
})

test('sets the initial value as passed', async () => {
	const {result, waitForNextUpdate} = renderHook(() => {
		return useComputed(() => resolve([1, 2, 3, 4]), [], [])
	})
	expect(result.current.length).toBe(0)

	await waitForNextUpdate()
	expect(result.current.length).toBe(4)
})

test('recomputes when dependencies change', () => {
	let dep = 'foo'
	const {result, rerender} = renderHook(() => useComputed((value, dep) => dep, [dep]))
	expect(result.current).toBe('foo')

	dep = 'bar'
	rerender()
	expect(result.current).toBe('bar')
})

test('current value is passed to the recompute function', () => {
	let dep = 'foo'
	const {result, rerender} = renderHook(() => {
		return useComputed((value, dep) => value ? value + dep : dep, [dep])
	})

	dep = 'bar'
	rerender()
	expect(result.current).toBe('foobar')
})
