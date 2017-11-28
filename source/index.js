require('isomorphic-fetch')

// HELPERS
const fetchJson = async (url) => (await (await fetch(url)).json())
const render = require('mustache').render
const renderKeys = (data, subs, keys) => {
  return (keys || Object.keys(data)).reduce((acc, key) => {
    if(data[key]) acc[key] = render(data[key], subs)
    return acc
  }, {})
}

export const helpers = { render, renderKeys, fetchJson }


const Send = async (payload, to, subs = {}, handler) => {
  try{
    return await handler(payload, to, subs, helpers)
  }catch(e){ 
    console.log(e)
    return false
  }
}

const Template = async (name, to, subs = {}, handler, initPayload) => {
  try {
    let payload = {}
    if(typeof initPayload == 'object') payload = initPayload
    if(typeof initPayload == 'string') payload = await fetchJson(initPayload) // if url given
    if(typeof initPayload == 'function') payload = await initPayload(name, subs, helpers)
    return await Send(payload, to, subs, handler)
  }catch(e){ 
    console.log(e)
    return false
  }
}

export default (handler, initPayload) => ({
  send: async (payload, to, subs) => (await Send(payload, to, subs, handler)), 
  template: async (name, to, subs) => (await Template(name, to, subs, handler, initPayload)) 
})