import type * as Cloud from 'wx-server-sdk'

type AnyObject = Record<string, any>

type UnionProp = string | symbol | number

function getResolveData<T> (target:T, invokePath?:UnionProp[], ...args:any[]) {
  const path = invokePath?.join('.')
  return {
    errCode: 0,
    errMsg: 'Mock Api',
    invokePath: path,
    target,
    args
  }
}

function createFuncByTarget<T> (target:T, invokePath?:UnionProp[]) {
  return function (...args:any[]) {
    return Promise.resolve(getResolveData(target, invokePath, ...args))
  }
}

function createProxy<T extends AnyObject> (openapi: AnyObject = {}) {
  function createGetHandle () {
    return function get (target:T, prop:UnionProp, receiver:any, invokePath?:UnionProp[]) {
      invokePath?.push(prop)
      const tmp = target ? target[prop as string] ?? {} : target
      const wrapFunc = createFuncByTarget<T>(tmp, invokePath)
      return getProxy(wrapFunc as unknown as T, prop, invokePath)
    }
  }

  const get = createGetHandle()

  function getProxy (parent: T, prop: UnionProp, invokePath?:UnionProp[]): T {
    const proxy = new Proxy(parent, {
      get (target:T, prop:UnionProp, receiver:any) {
        return get(target, prop, receiver, invokePath)
      }
    })
    return proxy
  }

  return new Proxy(openapi, {
    get (target:T, prop:UnionProp, receiver:any) {
      const invokePath:UnionProp[] = []
      return get(target, prop, receiver, invokePath)
    }
  })
}

function getOpenapiProxy (openapi: Record<string, any> = {}) {
  // highjack
  return createProxy(openapi)
}

export function mock (cloud: typeof Cloud) {
  // @ts-ignore
  cloud.openapi = getOpenapiProxy()
  return cloud
}
