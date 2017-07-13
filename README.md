# Simple sending service

### Install
```
npm i uteel-sender
```

### Usage
```js
import Sender from 'uteel-sender'
import Twilio from 'twilio'

const handler = async ({ body }, to) => Twilio.send({ 
    phone: to
  , message: body
  , apikey: 'xxxx' 
})

const SMS = Sender(handler)

SMS.send({ body: 'Hello brother' }, '+33608033428')
```


### Test
```
npm test
```
