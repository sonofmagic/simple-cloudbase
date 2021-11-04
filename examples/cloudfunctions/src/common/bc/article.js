import articleCol from '~/common/db/collection/article'
import db from '../db/index'
const $ = db.command.aggregate
export async function getPagedList ({
  pageIndex = 1,
  perPage = 10,
  orderBy = 'desc',
  title,
  openid,
  type,
  state = 4
}) {
  const query = articleCol
    .where({
      title,
      openid,
      type,
      state
    })
    .orderBy('createTime', orderBy)
    .skip((pageIndex - 1) * perPage)
    .limit(perPage)
    .field({
      body: false
    })
  const res = await Promise.all([query.count(), query.get()])
  const [{ total }, { data }] = res

  return {
    data,
    total
  }
}

export async function getItemById (id) {
  const { data } = await articleCol.doc(id).get()
  return data
}

// type 类型 1. 文章 2. 活动
// state 状态 1. 草稿 2.审核中 3.审核驳回 4.正常状态 5. 下架删除
export async function addItem ({ title, body, openid, type, info }) {
  return await articleCol.add({
    data: {
      title,
      body,
      openid,
      type,
      state: 1, // 默认草稿
      createTime: new db.serverDate(),
      info
    }
  })
}

export async function getCountByState ({ openid, type, state }) {
  return await articleCol
    .aggregate()
    .match({
      type,
      openid
    })
    .group({
      _id: '$state',
      count: $.sum(1)
    })
    .end()
}

export async function updateItem (id, obj) {
  return await articleCol.doc(id).update(obj)
}

export async function deleteItem (id) {
  return await articleCol.doc(id).remove()
}
