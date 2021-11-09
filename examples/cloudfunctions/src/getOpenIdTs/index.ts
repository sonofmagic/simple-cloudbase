import { cloudInit } from '~/common-ts/index'
const cloud = cloudInit()

exports.main = async (event: any, context: any) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    wxContext,
    env: process.env
    // openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    // unionid: wxContext.UNIONID,
    // env: wxContext.ENV
  }
}
