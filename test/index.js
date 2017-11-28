import chai, { expect, assert } from 'chai'
chai.should() // enhance objects
import Sender from '../source'

const mock = {
    payload: { title: '{{name}}', body: '{{foo.bar}}' }
  , to: ''
  , subs: { name: 'foo', foo: { bar: 'baz' } }
}

const handler = async (payload, to, subs, { renderKeys }) 
  => ({ 
    ...payload, 
    ...renderKeys(payload, subs, ['body', 'title']) 
  })

const initPayload = async (name, subs) 
  => mock.payload

const myService = Sender(handler, initPayload)




describe('Sender', async (done) => {

  // before(done => done())

  describe('message', () => {

    it('send()', async done => {
      try {
        let message = await myService.send(mock.payload, mock.to, mock.subs)
        assert.equal(message.title, 'foo')
        assert.equal(message.body, 'baz')
        done()
      }catch(e){ done(e) }
    })

    it('template()', async done => {
      try {
        let message = await myService.template('templateName', mock.to, mock.subs)
        assert.equal(message.title, 'foo')
        assert.equal(message.body, 'baz')
        done()
      }catch(e){ done(e) }
    })

    // it('timeout', done => setTimeout(done, 3000))

  })

})