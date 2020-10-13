import {renderHook} from '@testing-library/react-hooks'
import {useComputedAsync} from 'src/index'
import {sleep, timeoutString} from './utils'

test('creates a basic async computed property', () => {
	const rendered = renderHook(() => useComputedAsync(() => timeoutString('bar', 50), []))
	const ref = rendered.result.current
	expect(ref.current).toBeUndefined()
})

test('sets an initial value', () => {
	const rendered = renderHook(() => useComputedAsync(() => timeoutString('bar', 50), [], 'foo'))
	const ref = rendered.result.current
	expect(ref.current).toBe('foo')
})

test('executes the async function', async (done) => {
	const rendered = renderHook(() => useComputedAsync(() => timeoutString('bar', 50), [], 'foo'))
	const ref = rendered.result.current
	expect(ref.current).toBe('foo')

	setTimeout(() => {
		expect(ref.current).toBe('bar')
		done()
	}, 1000)
})

test('recomputes when dependencies change', async (done) => {
	let val = 'foo'
	const rendered = renderHook(() => useComputedAsync((val) => timeoutString(val, 50), [val], 'foo'))
	const ref = rendered.result.current

	await sleep(50)
	expect(ref.current).toBe('foo')

	val = 'bar'
	rendered.rerender()
	await sleep(50)
	expect(ref.current).toBe('bar')

	done()
})
