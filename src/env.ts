export const NODE_ENV = process.env.NODE_ENV
export const SET_NODE_ENV = (env: string) => {
  // 当 NODE_ENV 不存在时，给它赋值，这可以确保用户 cross-env 的环境变量优先级最高
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = env
  }
}
export const isDev = () => process.env.NODE_ENV === 'development'
export const isProd = () => process.env.NODE_ENV === 'production'
export const setDev = () => {
  SET_NODE_ENV('development')
}
export const setProd = () => {
  SET_NODE_ENV('production')
}
