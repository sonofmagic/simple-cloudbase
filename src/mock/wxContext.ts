import type { ICloud } from 'wx-server-sdk'
import { resolve } from '../util'
import fs from 'fs'

type WXContext = ICloud.WXContext

export interface IMockWXContextParams {
  rootDir: string
  ctx?: WXContext
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
    const mockData = require(mockFile)
    console.log(mockData)
    return mockData
  } catch (error) {
    console.error(error)
  }
}
