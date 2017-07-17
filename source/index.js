require('isomorphic-fetch')

const fetchJson = async (url) => (await (await fetch(url)).json())
const interpolate = require('mustache').render


const Send = async (payload, to, subs = {}, handler) => {
  const helpers = { fetchJson, interpolate, subs }
  return await handler(payload, to, helpers)
}

const Template = async (name, to, subs = {}, sendHandler, templateHandler) => {
  try {
    const helpers = { fetchJson, interpolate, subs }
    const payload = typeof templateHandler == 'string'
      ? await fetchJson(templateHandler)
      : await templateHandler(name, helpers)

    return await Send(payload, to, subs, sendHandler)
  }catch(e){ return e }
}

export default (sendHandler, templateHandler) => ({
  send: async (payload, to, subs) => (await Send(payload, to, subs, sendHandler)), 
  template: async (name, to, subs) => (await Template(name, to, subs, sendHandler, templateHandler)) 
})