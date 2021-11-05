import { writeCloudbaserc } from '@/templete/cloudbaserc'
import { nativeProjectPath } from './util'
import path from 'path'
import fs, { promises as fsp } from 'fs'
import type {
  ICloudBaseConfig
  // ICloudFunction
} from '@cloudbase/cli/types/types'

describe('templete functions test', () => {
  test('generate cloudbaserc.json templete ', async () => {
    await writeCloudbaserc(nativeProjectPath, 'src')
    const flag = fs.existsSync(
      path.resolve(nativeProjectPath, 'cloudbaserc.json')
    )
    expect(flag).toBe(true)
  })

  test('[simple.json] ignore', async () => {
    await writeCloudbaserc(nativeProjectPath, 'src')
    const jsonPath = path.resolve(nativeProjectPath, 'cloudbaserc.json')
    const flag = fs.existsSync(jsonPath)
    if (flag) {
      const config: ICloudBaseConfig = JSON.parse(
        await fsp.readFile(jsonPath, {
          encoding: 'utf-8'
        })
      )
      expect(
        config.functions!.findIndex((x) => x.name === 'ignoreFn') === -1
      ).toBe(true)
    }
  })
})
