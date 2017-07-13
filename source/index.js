require('isomorphic-fetch')

const fetchJson = async (url) => (await (await fetch(url)).json())
const interpolate = require('mustache').render


const Send = async (payload, to, handler) => {
  return await handler(payload, to)
}

const Template = async (name, to, subs = {}, sendHandler, templateHandler) => {
  try {
    const helpers = { fetchJson, interpolate, subs }
    const payload = typeof templateHandler == 'string'
      ? await fetchJson(templateHandler)
      : await templateHandler(name, helpers)

    return await Send(payload, to, sendHandler)
  }catch(e){ return e }
}

export default (sendHandler, templateHandler) => ({
  send: async (payload, to) => (await Send(payload, to, sendHandler)), 
  template: async (name, to, subs) => (await Template(name, to, subs, sendHandler, templateHandler)) 
})