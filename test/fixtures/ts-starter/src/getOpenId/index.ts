import cloud from 'wx-server-sdk'

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV as unknown
})

export async function main (event, context) {
  const wxContext = cloud.getWXContext()

  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID
  }
}
