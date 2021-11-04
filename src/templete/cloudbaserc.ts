import fs, { promises as fsp } from 'fs'
import path from 'path'
import type {
  ICloudBaseConfig,
  ICloudFunction
} from '@cloudbase/cli/types/types'

export const baseOption: ICloudBaseConfig & { version: string } = {
  version: '2.0',
  envId: '{{env.ENV_ID}}',
  functionRoot: './dist'
}

export function getBaseOption () {
  return { ...baseOption }
}

export async function getFunctions (distPath: string) {
  const fileList = await fsp.readdir(distPath)
  const functions = fileList.reduce<ICloudFunction[]>((acc, cur) => {
    const dirPath = path.resolve(distPath, cur)
    const stat = fs.statSync(dirPath)
    if (stat.isDirectory()) {
      acc.push({
        name: cur,
        installDependency: true,
        runtime: 'Nodejs12.16',
        ignore: ['*.md', 'node_modules', 'node_modules/**/*', '**/*.map'],
        handler: 'index.main',
        timeout: 20,
        envVariables: {
          TZ: 'Asia/Shanghai'
        }
      })
    }
    return acc
  }, [])
  return functions
}

export async function writeCloudbaserc (
  rootDir: string,
  distDir: string = 'dist'
) {
  const data = await getFunctions(path.join(rootDir, distDir))
  return await fsp.writeFile(
    path.resolve(rootDir, 'cloudbaserc.json'),
    JSON.stringify(data),
    {
      encoding: 'utf-8'
    }
  )
}
