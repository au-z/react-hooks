# React Hooks
> Helpful hooks to satisfy common reactive patterns.

## Installation
```bash
npm i @auzmartist/react-hooks
```

## Usage

### useComputed
```js
import {useComputed} from '@auzmartist/react-hooks'

function MyReactComponent({a, b}) {
  // THIS ALL-TOO-COMMON PATTERN

  const [sum, setSum] = useState(0)
  useEffect(() => {
  	setSum(a + b)
  }, [a, b])

  // BECOMES

  const [sum, setSum] = useComputed((current) => a + b, [a, b])

  return <div>
    {a} + {b} = {sum.current}
  </div>
}

// renders 4 + 3 = 7
```

### useComputedAsync
```js
import {useComputedAsync} from '@auzmartist/react-hooks'

function MyReactComponent({href}) {
  // THIS ALL-TOO-COMMON PATTERN

  const [response, setResponse] = useState(null)
  useEffect(() => {
    const fetchData = async () => setResponse(await fetch(href))
    fetchData()
  }, [href])

  // BECOMES

  const [response] = useComputedAsync((current, url) => fetch(url), [href])
}
```

Both `useComputed` and `useComputedAsync` take dependencies exactly like a vanilla `useEffect` hook. As a convenience, the dependencies array is passed to the compute function in the order they were passed.

```js
const computed = useComputed((current, localA, localB) => {
  return doSomething(localA, localB)
}, [A, B])
```

Above, dependencies `A` and `B` are provided as locally scoped variables `localA` and `localB`. This allows for more freedom in naming variables for the compute function.

The current value is also passed as the first argument. In `useComputedAsync`, the current value will be the provided `initial` value until the asynchronous behavior resolves.

`useComputed` and `useComputedAsync` expose their underlying state setter for manual updates outside of the computed scope. Avoid using the setter manually unless necessary. Updates to the computed property outside of the compute function increase the logical surface area of your code.

### useEffectAsync
A simple wrapper around the `useEffect` hook for handling asynchronous computation.

```js
import {useEffectAsync} from '@auzmartist/react-hooks'

function MyReactComponent({href}) {
  const [respose, setResponse] = useState(null)
  useEffectAsync(async (unmounted) => !unmounted && setResponse(await fetchData(href)), [href])
}
```
#### Options

**unmounted**: Indicates whether the component has unmounted, allowing you to prevent memory leaks
