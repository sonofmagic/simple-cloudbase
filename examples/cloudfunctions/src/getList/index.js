import cloud from '~/common/cloud'
import _ from '~/common/db/command'
import userCol from '~/common/db/collection/user'

export async function main(event, context) {
  const wxContext = cloud.getWXContext()
  const { fields = [] } = event

  if (Array.isArray(fields) && fields.length > 0) {
    const openid = wxContext.OPENID
    const { data } = await userCol
      .where({
        openid
      })
      .field(
        fields.reduce((acc, cur) => {
          acc[cur] = 1
          return acc
        }, {})
      )
      .get()

    if (data.length > 0) {
      const hit = data[0]
      const result = fields.reduce(
        (acc, cur) => {
          acc[cur] = hit[cur]
          return acc
        },
        {
          openid
        }
      )
      return result
    } else {
      return {
        code: 200,
        list: []
      }
    }
  } else {
    return {
      code: 200,
      list: []
    }
  }
}
