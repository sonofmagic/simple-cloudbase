import type { ICloud } from 'wx-server-sdk'
import { resolve } from '../util'
import fs from 'fs'

type WXContext = ICloud.WXContext

export interface IMockWXContextParams {
  rootDir: string
  // ctx?: WXContext
}

function setProcessEnv (ctx: WXContext) {
  // WX_API_TOKEN 是免鉴权的关键
  process.env.WX_CONTEXT_KEYS =
    'WX_UNIONID,WX_CLIENTIP,WX_CLIENTIPV6,WX_FROM_APPID,WX_FROM_OPENID,WX_FROM_UNIONID,WX_OPEN_DATA_INFO,WX_APPID,WX_OPENID,WX_API_TOKEN'

  Object.entries(ctx).forEach(([key, val], idx) => {
    switch (key) {
      case 'ENV': {
        process.env.TCB_ENV = val
        break
      }
      case 'SOURCE': {
        process.env.TCB_SOURCE = val
        break
      }
      default: {
        process.env[`WX_${key}`] = val
        break
      }
    }
  })
}

export async function mock (params: IMockWXContextParams) {
  const mockDir = resolve(params.rootDir, 'mock')
  const isDirExisted = fs.existsSync(mockDir)
  if (!isDirExisted) {
    return
  }
  const mockFile = resolve(mockDir, 'wxContext.js')
  const isMockFileExisted = fs.existsSync(mockFile)
  if (!isMockFileExisted) {
    return
  }
  try {
    const mockData: WXContext = require(mockFile)
    setProcessEnv(mockData)
    return mockData
  } catch (error) {
    console.error(error)
  }
}
