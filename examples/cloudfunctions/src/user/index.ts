import { cloudInit } from '~/common-ts/index'

const cloud = cloudInit()
export async function main (event: Record<string, any>, context: any) {
  const wxContext = cloud.getWXContext()
}
