import { callFunction } from './request'

export function getList (data?: Record<string, any>) {
  return callFunction('getList', data)
}

export function getOpenId (data?: Record<string, any>) {
  return callFunction('getOpenId', data)
}

export function getOpenIdTs (data?: Record<string, any>) {
  return callFunction('getOpenIdTs', data)
}

export function getWxacodeUnlimit (data?: Record<string, any>) {
  return callFunction('getWxacodeUnlimit', data)
}

// 此函数根据 data.type 进行路由派发
export function quickstartFunctions (data?: Record<string, any>) {
  return callFunction('quickstartFunctions', data)
}
