import chai, { expect, assert } from 'chai'
chai.should() // enhance objects


import Sender from '../source'



describe('Sender', async (done) => {

  const sendHandler = async (payload) => payload
  const templateHandler = templates => async (name, { interpolate, subs }) => interpolate(templates[name], subs)
  const templates = { signup: 'Hello {{name}}' }
  const myService = Sender(sendHandler, templateHandler(templates))

  before(done => done())

  describe('send', () => {

    it('message', async done => {
      let payload = { title: 'my title', body: 'my body' }
      let message = await myService.send(payload, 'louis@gmail.com')

      assert.equal(message.title, 'my title')
      done()
    })

    it('template', async done => {
      let message = await myService.template('signup', 'louis@gmail.com', { name: 'Louis' })
      assert.equal(message, 'Hello Louis')
      done()
    })

    // it('timeout', done => setTimeout(done, 3000))

  })

})