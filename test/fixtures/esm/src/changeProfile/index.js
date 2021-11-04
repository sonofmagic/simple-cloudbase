// 云函数入口文件

import cloud from '~/common/cloud'
// import { UserInfoProjection } from '~/common/model/index.js'
import { updateUserByOpenid } from '~/common/bc/user.js'
export async function main (event, context) {
  const { options } = event
  // console.log(event)
  const wxContext = cloud.getWXContext()
  try {
    await updateUserByOpenid(wxContext.OPENID, options)
    return {
      code: 200
    }
  } catch (err) {
    console.error(err)
    return {
      code: 40000,
      message: '找不到此用户'
    }
  }
}
