import cloud from 'wx-server-sdk'

export function cloudInit (env?: string) {
  cloud.init({
    // API 调用都保持和云函数当前所在环境一致
    env: env || (cloud.DYNAMIC_CURRENT_ENV as unknown as string)
  })
  return cloud
}

export default cloud
