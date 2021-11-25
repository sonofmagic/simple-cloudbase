import type * as Cloud from 'wx-server-sdk'

type AnyObject = Record<string, any>

type UnionProp = string | symbol | number

export interface IBaseContext{
  invokePath: UnionProp[]
  [Key:string]: any
}

function createContext ():IBaseContext {
  return {
    invokePath: []
  }
}

function getResolveData<T> (target:T, ctx:IBaseContext, ...args:any[]) {
  const path = ctx.invokePath.join('.')
  return {
    errCode: 0,
    errMsg: 'Mock Api',
    invokePath: path,
    target,
    args
  }
}

function createFuncByTarget<T> (target:T, ctx:IBaseContext) {
  return function (...args:any[]) {
    return Promise.resolve(getResolveData(target, ctx, ...args))
  }
}

function createProxy<T extends AnyObject> (openapi: AnyObject = {}) {
  function createGetHandle () {
    return function get (target:T, prop:UnionProp, receiver:any, ctx:IBaseContext) {
      ctx.invokePath.push(prop)
      const tmp = target ? target[prop as string] ?? {} : target
      const wrapFunc = createFuncByTarget<T>(tmp, ctx)
      return getProxy(wrapFunc as unknown as T, prop, ctx)
    }
  }

  const get = createGetHandle()

  function getProxy (parent: T, prop: UnionProp, ctx:IBaseContext): T {
    const proxy = new Proxy(parent, {
      get (target:T, prop:UnionProp, receiver:any) {
        return get(target, prop, receiver, ctx)
      }
    })
    return proxy
  }

  return new Proxy(openapi, {
    get (target:T, prop:UnionProp, receiver:any) {
      const ctx = createContext()
      return get(target, prop, receiver, ctx)
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
