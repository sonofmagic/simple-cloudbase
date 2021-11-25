export const getOpenIdRaw =
`import { cloudInit } from '~/common/init'

const cloud = cloudInit()

export async function main (event:Record<string, any>, context:Record<string, any>) {
  const wxContext = cloud.getWXContext()

  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID
  }
}
`

export const commonInitRaw =
`import cloud from 'wx-server-sdk'

export function cloudInit (env?: string) {
  cloud.init({
    env: env ?? (cloud.DYNAMIC_CURRENT_ENV as unknown as string)
  })
  return cloud
}
`
