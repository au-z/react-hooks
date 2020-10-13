import {renderHook} from '@testing-library/react-hooks'
import {useEffectAsync} from 'src/index'
import {sleep, timeoutString} from './utils'

test('creates a basic state', async (done) => {
	let str: string
	renderHook(() => useEffectAsync(async () => {
		str = await timeoutString('foo', 50)
	}, []))
	expect(str).toBeUndefined()

	await sleep(50)
	expect(str).toBe('foo')

	done()
})

test('recalculates when dependencies change', async (done) => {
	let str: string
	let dep = 'foo'
	const rendered = renderHook(() => useEffectAsync(async (dep) => {
		str = await timeoutString(dep, 50)
	}, [dep]))
	expect(str).toBeUndefined()

	await sleep(50)
	expect(str).toBe('foo')

	dep = 'bar'
	rendered.rerender()
	await sleep(50)
	expect(str).toBe('bar')

	done()
})
