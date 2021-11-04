import '~/common/cloud'
import _ from '~/common/db/command'
import userCol from '~/common/db/collection/user'

export async function main (event, context) {
  const { cardId } = event
  if (cardId) {
    const { data } = await userCol
      .where({
        cards: _.elemMatch({
          id: cardId
        })
      })
      .get()
    if (data.length > 0) {
      const hit = data[0]
      await userCol.doc(hit._id).update({
        data: {
          cards: _.pull({
            id: cardId
          })
        }
      })

      return {
        code: 200
      }
    } else {
      return {
        code: 40000,
        message: '找不到此名片'
      }
    }
  } else {
    return {
      code: 40000,
      message: '找不到此名片'
    }
  }
}
