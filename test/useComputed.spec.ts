import {act, renderHook} from '@testing-library/react-hooks'
import {useComputed} from 'src/index'

test('creates a basic state', () => {
	const {result} = renderHook(() => useComputed(() => 'bar', []))
	expect(result.current[0]).toBe('bar')
})

test('recomputes when dependencies change', () => {
	let dep = 'foo'
	const {result, rerender} = renderHook(() => useComputed((value, dep) => dep, [dep]))
	expect(result.current[0]).toBe('foo')

	dep = 'bar'
	rerender()
	expect(result.current[0]).toBe('bar')
})

test('computed value can be manually set', () => {
	let dep = 'foo'
	const {result, rerender} = renderHook(() => useComputed((value, dep) => dep, [dep]))
	expect(result.current[0]).toBe('foo')

	act(() => {
		result.current[1]('bar')
	})
	rerender()
	expect(result.current[0]).toBe('bar')

	dep = 'baz'
	rerender()
	expect(result.current[0]).toBe('baz')
})

test('current value is passed to the recompute function', () => {
	let dep = 'foo'
	const {result, rerender} = renderHook(() => {
		return useComputed((value, dep) => value ? value + dep : dep, [dep])
	})

	dep = 'bar'
	rerender()
	expect(result.current[0]).toBe('foobar')
})
