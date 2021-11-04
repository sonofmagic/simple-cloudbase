import cloud from '~/common/cloud'
// width	number	430	否	二维码的宽度，单位 px，最小 280px，最大 1280px
// https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/qr-code/wxacode.getUnlimited.html
export async function main (event, context) {
  const { scene = '', page, width, autoColor, lineColor, isHyaline } = event
  const result = await cloud.openapi.wxacode.getUnlimited({
    scene,
    page,
    width,
    autoColor,
    lineColor,
    isHyaline
  })
  return result
}
