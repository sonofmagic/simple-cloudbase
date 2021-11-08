export async function callFunction (
  name: string,
  data?: Record<string, any>,
  config?: { env: string }
) {
  return wx.cloud.callFunction({
    name,
    data,
    config
  })
}
