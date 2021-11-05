import fs, { promises as fsp } from 'fs'
import path from 'path'

export interface ISimpleJsonConfig {
  ignore?: boolean
  externals?: []
}

export type IBuiltinOption = {
  path: string
  [key: string]: any
} & ISimpleJsonConfig

export async function getFunctions (distPath: string) {
  const fileList = await fsp.readdir(distPath)
  const functions = fileList.reduce<IBuiltinOption[]>((acc, cur) => {
    const dirPath = path.resolve(distPath, cur)
    const stat = fs.statSync(dirPath)
    if (stat.isDirectory()) {
      const item: IBuiltinOption = {
        path: dirPath
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
            Object.assign(item, config)
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
