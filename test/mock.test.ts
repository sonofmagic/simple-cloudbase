import { mock as mockWxContext } from '../src/mock/wxContext'

import { tsProjectPath, esmProjectPath, nativeProjectPath } from './util'

describe('[mock](wxContext) test group', () => {
  test('default test wxContext', async () => {
    const mockCtx = await mockWxContext({
      rootDir: tsProjectPath
    })
    expect(mockCtx.SOURCE).toBe('wx_devtools')
  })

  test('test wxContext not exist', async () => {
    const mockCtx = await mockWxContext({
      rootDir: nativeProjectPath
    })
    expect(Boolean(mockCtx)).toBe(false)
  })

  test('test mock dir not exist', async () => {
    const mockCtx = await mockWxContext({
      rootDir: esmProjectPath
    })
    expect(Boolean(mockCtx)).toBe(false)
  })
})
