import {renderHook} from '@testing-library/react-hooks'
import {useComputedAsync} from 'src/index'
import {timeoutString} from './utils'

test('creates a basic async computed property', () => {
	const {result} = renderHook(() => useComputedAsync(() => timeoutString('bar', 5), []))
	expect(result.current[0]).toBeUndefined()
})

test('sets an initial value', () => {
	const {result} = renderHook(() => useComputedAsync(() => timeoutString('bar', 5), [], 'foo'))
	expect(result.current[0]).toBe('foo')
})

test('executes the async function', async (done) => {
	const {result, waitForNextUpdate} = renderHook(() => useComputedAsync(() => timeoutString('bar', 5), [], 'foo'))
	expect(result.current[0]).toBe('foo')

	await waitForNextUpdate()
	expect(result.current[0]).toBe('bar')

	done()
})

test('recomputes when dependencies change', async (done) => {
	let dep = 'foo'
	const {result, rerender, waitForNextUpdate} = renderHook(() => {
		return useComputedAsync((_, dep) => timeoutString(dep, 5), [dep], '')
	})

	await waitForNextUpdate()
	expect(result.current[0]).toBe('foo')

	dep = 'bar'
	rerender()
	await waitForNextUpdate()
	expect(result.current[0]).toBe('bar')

	done()
})

test('current value is passed to the recompute function', async (done) => {
	let dep = 'foo'
	const {result, rerender, waitForNextUpdate} = renderHook(() => {
		return useComputedAsync((val, dep) => timeoutString(val + dep, 5), [dep], '')
	})

	await waitForNextUpdate()
	expect(result.current[0]).toBe('foo')

	dep = 'bar'
	rerender()
	await waitForNextUpdate()
	expect(result.current[0]).toBe('foobar')

	done()
})
