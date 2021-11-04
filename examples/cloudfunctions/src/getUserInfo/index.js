// 云函数入口文件

import cloud from '~/common/cloud'
import userCol from '~/common/db/collection/user'
// import { UserInfoProjection } from '~/common/model/index.js'
import { getUserByOpenid } from '~/common/bc/user.js'
export async function main (event, context) {
  const wxContext = cloud.getWXContext()
  const { baseInfo } = event
  const data = await getUserByOpenid(wxContext.OPENID)
  // const { data } = await userCol
  //   .where({
  //     openid: wxContext.OPENID
  //   })
  //   .field(UserInfoProjection)
  //   .get()
  if (data.length > 0) {
    return data[0]
  } else {
    if (baseInfo && typeof baseInfo === 'object') {
      const insertData = {
        ...baseInfo,
        openid: wxContext.OPENID,
        cards: []
      }
      await userCol.add({
        data: insertData
      })
      return insertData
    } else {
      return null
    }
  }
}
