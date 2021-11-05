import fs, { promises as fsp } from 'fs'
import path from 'path'
import type {
  ICloudBaseConfig,
  ICloudFunction
} from '@cloudbase/cli/types/types'
import { getFunctions } from '@/util'

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
  const res = await getFunctions(distPath)
  console.log(res)
  const fileList = await fsp.readdir(distPath)
  const functions = fileList.reduce<ICloudFunction[]>((acc, cur) => {
    const dirPath = path.resolve(distPath, cur)
    const stat = fs.statSync(dirPath)
    if (stat.isDirectory()) {
      const item: ICloudFunction = {
        name: cur,
        installDependency: true,
        runtime: 'Nodejs12.16',
        ignore: ['*.md', 'node_modules', 'node_modules/**/*', '**/*.map'],
        handler: 'index.main',
        timeout: 20,
        envVariables: {
          TZ: 'Asia/Shanghai'
        }
      }
      const configPath = path.resolve(dirPath, 'simple.json')
      const isConfigExisted = fs.existsSync(configPath)
      if (isConfigExisted) {
        try {
          const data = fs.readFileSync(configPath, {
            encoding: 'utf-8'
          })
          const config: ISimpleJsonConfig = JSON.parse(data)
          if (!config.ignore) {
            acc.push(item)
          }
          // true then ignore it
        } catch (error) {
          console.warn(
            `fail to parse ${cur}/simple.json as JSON , so ignore it`
          )
          acc.push(item)
        }
      } else {
        acc.push(item)
      }
    }
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
    JSON.stringify(option),
    {
      encoding: 'utf-8'
    }
  )
}
