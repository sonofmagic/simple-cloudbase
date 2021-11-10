import { writeCloudbaserc, buildAll } from '../src'
import {
  nativeProjectPath,
  remove,
  fsExists,
  nativeProjectCloudbasercPath
} from './util'
import { promises as fsp } from 'fs'
import type { ICloudBaseConfig } from '@cloudbase/cli/types/types'

describe('[Templete](cloudbaserc) functions test', () => {
  // beforeAll(async () => {
  //   return await del([nativeProjectCloudbasercPath])
  // })
  beforeEach(async () => {
    return await remove([nativeProjectCloudbasercPath])
  })

  test('generate cloudbaserc.json templete ', async () => {
    expect(fsExists(nativeProjectCloudbasercPath)).toBe(false)
    await buildAll({
      rootdir: nativeProjectPath
    })
    const option = await writeCloudbaserc(nativeProjectPath)
    expect(fsExists(nativeProjectCloudbasercPath)).toBe(true)
    expect(option!.version).toBe('2.0')
  })

  test('[simple.json] ignore', async () => {
    expect(fsExists(nativeProjectCloudbasercPath)).toBe(false)
    await buildAll({
      rootdir: nativeProjectPath
    })
    const config = await writeCloudbaserc(nativeProjectPath)
    expect(fsExists(nativeProjectCloudbasercPath)).toBe(true)
    expect(config!.version).toBe('2.0')
    const readedConfig: ICloudBaseConfig = JSON.parse(
      await fsp.readFile(nativeProjectCloudbasercPath, {
        encoding: 'utf-8'
      })
    )
    expect(
      readedConfig.functions!.findIndex((x) => x.name === 'ignoreFn') === -1
    ).toBe(true)
  })
})
