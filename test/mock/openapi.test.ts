import { mock } from '../../src/mock/openapi'

import cloud from 'wx-server-sdk'

beforeAll(() => {
  mock(cloud)
})
describe('[Mock](openapi) test group', () => {
  test('default test openapi', async () => {
    const params = {
      img: []
    }
    const res = await cloud.openapi.search.imageSearch(params)
    expect(res.errCode).toBe(0)
    expect(res.invokePath).toBe('search.imageSearch')
    expect(res.args[0]).toEqual(params)
  })
})
