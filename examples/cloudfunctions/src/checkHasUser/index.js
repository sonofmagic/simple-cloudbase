// 云函数入口文件

import cloud from '~/common/cloud'
// import { UserInfoProjection } from '~/common/model/index.js'
import { getUserByOpenid } from '~/common/bc/user.js'
export async function main (event, context) {
  const wxContext = cloud.getWXContext()
  const data = await getUserByOpenid(wxContext.OPENID)
  return data.length > 0
}
