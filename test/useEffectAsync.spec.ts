import {renderHook} from '@testing-library/react-hooks'
import {useEffectAsync} from 'src/index'
import {sleep, timeoutString} from './utils'

test('creates a basic state', async (done) => {
	let str: string
	renderHook(() => useEffectAsync(async () => {
		str = await timeoutString('foo', 5)
	}, []))
	expect(str).toBeUndefined()

	await sleep(5)
	expect(str).toBe('foo')

	done()
})

test('recalculates when dependencies change', async (done) => {
	let str: string
	let dep = 'foo'
	const rendered = renderHook(() => useEffectAsync(async () => {
		str = await timeoutString(dep, 5)
	}, [dep]))
	expect(str).toBeUndefined()

	await sleep(5)
	expect(str).toBe('foo')

	dep = 'bar'
	rendered.rerender()
	await sleep(5)
	expect(str).toBe('bar')

	done()
})

test('passes the unmounted status to the AsyncEffectCallback', async (done) => {
	let str: string
	renderHook(() => useEffectAsync(async (unmounted) => {
		expect(typeof unmounted).toBe('boolean')
		str = await timeoutString(unmounted.toString(), 5)
	}, []))
	expect(str).toBeUndefined()

	await sleep(5)
	expect(str).toBe('false')

	done()
})
