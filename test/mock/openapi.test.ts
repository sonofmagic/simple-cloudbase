import { mock } from '@/mock/openapi'

import cloud from 'wx-server-sdk'

beforeAll(() => {
  mock(cloud)
})
describe('[Mock](openapi) test group', () => {
  test('default test openapi', async () => {
    const params = {
      img: []
    }

    const res = await cloud.openapi.aaa(params)
    expect(res.errCode).toBe(0)
    expect(res.invokePath).toBe('aaa')
    expect(res.args[0]).toEqual(params)
    const res1 = await cloud.openapi.search.imageSearch(params)
    expect(res1.errCode).toBe(0)
    expect(res1.invokePath).toBe('search.imageSearch')
    expect(res1.args[0]).toEqual(params)
    const res2 = await cloud.openapi.search.aaa.imageSearch(params)
    expect(res2.errCode).toBe(0)
    expect(res2.invokePath).toBe('search.aaa.imageSearch')
    expect(res2.args[0]).toEqual(params)
  })
})
