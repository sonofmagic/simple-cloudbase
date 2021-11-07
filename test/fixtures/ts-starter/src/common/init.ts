import cloud from 'wx-server-sdk'

export function cloudInit (env?: string) {
  return cloud.init({
    env: env || (cloud.DYNAMIC_CURRENT_ENV as unknown)
  })
}
