/**
 * @param {Array} arr
 */
import { infoFields, followFields, likeFields, starFields } from './user.js'

export function createProjection (arr) {
  return arr.reduce((acc, cur) => {
    acc[cur] = 1
    return acc
  }, {})
}

// 云开发不会自动分析依赖，怎么办？？
export const UserInfoProjection = createProjection(infoFields)

export const FollowProjection = createProjection(followFields)

export const LikeProjection = createProjection(likeFields)

export const StarProjection = createProjection(starFields)
