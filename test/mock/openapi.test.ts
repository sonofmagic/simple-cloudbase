import { mock, createProxy } from '@/mock/openapi'

import cloud from 'wx-server-sdk'

let mockObj :Record<string, any>
beforeAll(() => {
  mock(cloud)
  mockObj = createProxy({}, {
    handler (path, t, done) {
      switch (path) {
        case 'a.1.b':{
          return new Promise((resolve, reject) => {
            resolve({
              a: 'b',
              t
            })
          })
        }
        case 'b.10.a':{
          return {
            b: 'a',
            t
          }
        }
      }
      return done()
    }
  })
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
    const res3 = await cloud.openapi.a[1]['12'](params)
    expect(res3.invokePath).toBe('a.1.12')
  })

  test('default test option mapper', async () => {
    const res = mockObj.a.a.a.a()
    expect(res.invokePath).toBe('a.a.a.a')
    const res1 = await mockObj.a[1].b()
    expect(res1.a).toBe('b')
    const res2 = mockObj.b[10].a()
    expect(res2.b).toBe('a')
  })
})
