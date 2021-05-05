Aliases for FETCH, mostly used for [eze](https://github.com/autr/eze), [ezapi](https://github.com/autr/ezapi). Defaults to `credententials: 'include'`.

**Install**

```
pnpm i --save fetcheriser
```

**Use**

```
import { get, put, post, del } from 'fetcheriser'

const silent = false

const res = await get( '/api/example', { hello: 'world' }, silent )
// GET -> /api/example?hello=world

const res = await post( '/api/example', { hello: 'world' }, silent )
// POST -> /api/example [body: { hello: 'world' }]

const res = await put( '/api/example', { hello: 'world' }, silent )
// PUT -> /api/example [body: { hello: 'world' }]

const res = await del( '/api/example', { hello: 'world' }, silent )
// DELETE -> /api/example [body: { hello: 'world' }]

console.log( res )

// -> {
//		code,
// 		status,
// 		message,
// 		data,
// 		error,
// 		ok
// }
```