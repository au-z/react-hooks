import {renderHook} from '@testing-library/react-hooks'
import {useComputed} from 'src/index'

test('creates a basic state', () => {
	const rendered = renderHook(() => useComputed(() => 'bar', []))
	expect(rendered.result.error).toBeUndefined()

	const ref = rendered.result.current
	expect(ref.current).toBe('bar')
})

test('recomputes when dependencies change', () => {
	let dep = 'foo'
	const rendered = renderHook(() => {
		return useComputed((dep) => dep, [dep])
	})
	const ref = rendered.result.current
	expect(ref.current).toBe('foo')

	dep = 'bar'
	rendered.rerender()
	expect(ref.current).toBe('bar')
})
