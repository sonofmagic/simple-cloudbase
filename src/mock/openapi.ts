import type * as Cloud from 'wx-server-sdk'

function createProxy (openapi: Record<string, any> = {}) {
  const invokePath:string[] = []
  function getProxy<T extends Record<string, any>> (target: T, prop: string | symbol | number, callTimes:number = 0): T| (()=> Promise<Record<string, any>>) {
    invokePath.push(prop as string)
    if (callTimes === 0) {
      const proxy = new Proxy(target, {
        get (t, prop) {
          return getProxy(t, prop, 1)
        }
      })
      return proxy
    } else {
      const path = invokePath.join('.')
      return (...args) => {
        return Promise.resolve({
          errCode: 0,
          errMsg: 'Mock Api',
          invokePath: path,
          args
        })
      }
    }
  }
  return new Proxy(openapi, {
    get (target, prop) {
      return getProxy(target, prop)
    }
  })
}

function getOpenapiProxy (openapi: Record<string, any> = {}) {
  const proxy = createProxy(openapi)
  return proxy
}

export function mock (cloud: typeof Cloud) {
  // @ts-ignore
  cloud.openapi = getOpenapiProxy()
  return cloud
}
