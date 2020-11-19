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

  const sum = useComputed((current) => a + b, [a, b])

  return <div>
    {a} + {b} = {sum.current}
  </div>
}

// renders 4 + 3 = 7
```

useComputed also handles asynchronously computed values.

```js
function myReactComponent({a, b}) {
  const response = useComputed(() => doSomeAsync(a, b), [a, b], initial)
}
```
For async computed properties, an `initial` value will be assigned synchronously.