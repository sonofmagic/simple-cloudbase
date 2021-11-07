import { cloudInit } from '~/common/init'

const cloud = cloudInit()

export async function main (event, context) {
  const wxContext = cloud.getWXContext()

  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID
  }
}
