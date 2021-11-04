import userCol from '~/common/db/collection/user'
import { UserInfoProjection } from '~/common/model/index.js'

export async function getUserByOpenid (openid, projection = UserInfoProjection) {
  const { data } = await userCol
    .where({
      openid
    })
    .field(projection)
    .get()
  return data
}

export async function updateUserByOpenid (openid, options) {
  // console.log(openid, options)
  const res = await userCol
    .where({
      openid
    })
    .limit(1)
    .update({
      data: options
    })
  return res
}
