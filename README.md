# Simple router

### Install
```
npm i uteel-router
```

### Usage
```js
import { router as Router, get, post } from 'uteel-router'

const router = Router(
    get('/users', handler)
  , post('/users/:slug', handler)
)
```

### Infos
The router follow the standard `(req, res)` signature

### Test
```
npm test
```
