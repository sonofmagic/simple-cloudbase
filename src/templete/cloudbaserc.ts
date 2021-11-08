import { promises as fsp } from 'fs'
import path from 'path'
import type {
  ICloudBaseConfig,
  ICloudFunction
} from '@cloudbase/cli/types/types'
import { getFunctions, jsonStringify } from '../util'

export interface ISimpleJsonConfig {
  ignore?: boolean
  externals?: []
}

export const baseOption: ICloudBaseConfig & { version: string } = {
  version: '2.0',
  envId: '{{env.ENV_ID}}',
  functionRoot: 'dist'
}

export function getBaseOption (functionRoot: string) {
  return { ...baseOption, functionRoot }
}

export async function getDeployFunctions (distPath: string) {
  const builtinOptions = await getFunctions(distPath)

  const functions = builtinOptions.reduce<ICloudFunction[]>((acc, cur) => {
    const item: ICloudFunction = {
      name: cur.name,
      installDependency: true,
      runtime: 'Nodejs12.16',
      ignore: ['*.md', 'node_modules', 'node_modules/**/*', '**/*.map'],
      handler: 'index.main',
      timeout: 20,
      envVariables: {
        TZ: 'Asia/Shanghai'
      }
    }
    acc.push(item)
    return acc
  }, [])

  return functions
}

export async function writeCloudbaserc (
  rootDir: string,
  distDir: string = 'dist'
) {
  const functions = await getDeployFunctions(path.join(rootDir, distDir))
  const option = getBaseOption(distDir)
  option.functions = functions
  return await fsp.writeFile(
    path.resolve(rootDir, 'cloudbaserc.json'),
    jsonStringify(option),
    {
      encoding: 'utf-8'
    }
  )
}
