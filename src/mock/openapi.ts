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

export interface IDefaultResponse{
  errCode:number
  errMsg:string
  invokePath:string
  target:any
  args:any[]
}

function getDefaultResponse (path:string, target:any, args:any[]):IDefaultResponse {
  return {
    errCode: 0,
    errMsg: 'Mock Api',
    invokePath: path,
    target,
    args
  }
}

export interface ICreateProxyOptions{
  /**
   * @default ()=>
   * errCode: 0,
   * errMsg: 'Mock Api',
   * invokePath: path,
   * target,
   * args
   */
  handler?:(path:string, target:any, getDefaultRes:()=>IDefaultResponse)=> any
}

export function createProxy<T extends AnyObject> (obj: AnyObject = {}, options?:ICreateProxyOptions) {
  const { handler } = options ?? {}

  function createFuncByTarget<T> (target:T, ctx:IBaseContext) {
    return function (...args:any[]) {
      const path = ctx.invokePath.join('.')
      if (handler) {
        if (typeof handler === 'function') {
          return handler(path, target, () => {
            return getDefaultResponse(path, target, args)
          })
        } else {
          throw new TypeError('handler must be a function !')
        }
      }
      return getDefaultResponse(path, target, args)
    }
  }

  function createGetHandler () {
    return function handler (target:T, prop:UnionProp, receiver:any, ctx:IBaseContext) {
      ctx.invokePath.push(prop)
      const tmp = target ? target[prop as string] ?? {} : target
      const wrapFunc = createFuncByTarget<T>(tmp, ctx)
      return getProxy(wrapFunc as unknown as T, prop, ctx)
    }
  }

  const get = createGetHandler()

  function getProxy (parent: T, prop: UnionProp, ctx:IBaseContext): T {
    const proxy = new Proxy(parent, {
      get (target:T, prop:UnionProp, receiver:any) {
        return get(target, prop, receiver, ctx)
      }
    })
    return proxy
  }

  return new Proxy(obj, {
    get (target:T, prop:UnionProp, receiver:any) {
      const ctx = createContext()
      return get(target, prop, receiver, ctx)
    }
  })
}

export function mock (cloud: typeof Cloud) {
  // @ts-ignore
  // highjack
  cloud.openapi = createProxy(cloud.openapi)
  return cloud
}
