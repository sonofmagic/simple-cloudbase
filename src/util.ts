import fs, { promises as fsp } from 'fs'
import path from 'path'
import consola from 'consola'

export const log = consola
export interface ISimpleJsonConfig {
  ignore?: boolean
  externals?: []
}

export type IBuiltinOption = {
  path: string
  name: string
  extra?: ISimpleJsonConfig & {
    [key: string]: any
  }
}

export function resolve (...pathSegments: string[]) {
  return path.resolve(...pathSegments)
}
export async function getFunctions (distPath: string) {
  const fileList = await fsp.readdir(distPath)
  const functions = fileList.reduce<IBuiltinOption[]>((acc, cur) => {
    const dirPath = path.resolve(distPath, cur)
    const stat = fs.statSync(dirPath)
    if (stat.isDirectory()) {
      const item: IBuiltinOption = {
        path: dirPath,
        name: cur
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
            item.extra = config

            acc.push(item)
          }
          // true then ignore it
        } catch (error) {
          log.warn(`fail to parse ${cur}/simple.json as JSON , so ignore it`)
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

export async function copyConfigJson (srcDir: string, outDir: string) {
  const filename = 'config.json'
  const srcPath = path.resolve(srcDir, filename)
  if (fs.existsSync(srcPath)) {
    const outPath = path.resolve(outDir, filename)
    await fsp.copyFile(srcPath, outPath)
  }
}

export const PickKeys = [
  'bundle',
  'splitting',
  'preserveSymlinks',
  'outfile',
  'metafile',
  'outdir',
  'outbase',
  'platform',
  'external',
  'loader',
  'resolveExtensions',
  'mainFields',
  'conditions',
  'write',
  'allowOverwrite',
  'tsconfig',
  'outExtension',
  'publicPath',
  'entryNames',
  'chunkNames',
  'assetNames',
  'inject',
  'banner',
  'footer',
  'incremental',
  'entryPoints',
  'stdin',
  'plugins',
  'absWorkingDir',
  'nodePaths',
  'watch'
]

export function jsonStringify (value: any) {
  return JSON.stringify(value, null, 2)
}
