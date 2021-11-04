import cloud from '~/common/cloud.js'
import dayjs from '~/common/util/day'
// import { getNanoid as nanoid } from '~/common/util/nanoid'
import _ from '~/common/db/command'
import userCol from '~/common/db/collection/user'
import { isHasKeyObject } from '~/common/util/index'

export async function main (event, context) {
  const wxContext = cloud.getWXContext()
  const {
    cardId,
    params = {
      like: false,
      star: false,
      follow: false
    },
    openid,
    // 那个名片用户的openid
    targetOpenid
  } = event

  const currentOpenid = openid || wxContext.OPENID
  if (cardId) {
    const result = Object.keys(params).reduce((acc, cur) => {
      acc[cur] = false
      return acc
    }, {})

    const { data } = await userCol
      .where({
        openid: currentOpenid
        // cards: _.elemMatch({
        //   id: cardId
        // })
      })
      .field(
        Object.entries(params).reduce((acc, [k, v]) => {
          if (v) {
            acc[k + 's'] = 1
          }
          return acc
        }, {})
      )

      .get()
    if (data.length > 0) {
      const thisUser = data[0]
      if (params.like) {
        if (Array.isArray(thisUser.likes)) {
          if (thisUser.likes.findIndex((x) => x === cardId) > -1) {
            result.like = true
          }
        }
      }
      if (params.star) {
        if (Array.isArray(thisUser.stars)) {
          if (thisUser.stars.findIndex((x) => x.id === cardId) > -1) {
            result.star = true
          }
        }
      }
      if (params.follow && targetOpenid) {
        if (Array.isArray(thisUser.follows)) {
          if (
            thisUser.follows.findIndex((x) => x.openid === targetOpenid) > -1
          ) {
            result.follow = true
          }
        }
      }
    }

    return Object.assign({}, result)
  } else {
    return {
      code: 40000,
      message: '找不到此用户'
    }
  }
}
