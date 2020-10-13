# React Hooks
> Helpful hooks to satisfy common reactive patterns.

## Installation
```bash
npm i react-hooks
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

  const sum = useComputed(() => a + b, [a, b])

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

  const response = useComputedAsync((url) => fetch(url), [href])
}
```

Both `useComputed` and `useComputedAsync` take dependencies exactly like a vanilla `useEffect` hook. As a convenience, the dependencies array is passed to the compute function in the order they were passed. So for example:

```js
const computed = useComputed((localA, localB) => {
  return doSomething(localA, localB)
}, [A, B])
```

In the above example, dependencies `A` and `B` are provided as locally scoped variables `localA` and `localB`. This allows for more freedom in naming variables for the compute function.

### useEffectAsync
A simple wrapper around the `useEffect` hook for handling asynchronous computation.

```js
import {useEffectAsync} from '@auzmartist/react-hooks'

function MyReactComponent({href}) {
  const [respose, setResponse] = useState(null)
  useEffectAsync(async () => setResponse(await fetchData(href)), [href])
}
```
