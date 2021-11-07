import { getFunctions, PickKeys, copyConfigJson, resolve } from './util'
import { build } from './build/index'
import { mergeDefaultConfig } from './build/defaults'
import type { BuildOptions, BuildResult } from 'esbuild'
import pick from 'lodash/pick'
export interface IBuildPathOption {
  rootdir: string
  srcdir: string
  outdir: string
  watch?: boolean
}

export async function buildAll (opt: IBuildPathOption) {
  const options = await getFunctions(resolve(opt.rootdir, opt.srcdir))
  const buildResultArray = await Promise.all(
    options.reduce<Promise<BuildResult>[]>((acc, cur) => {
      const outdir = resolve(opt.rootdir, opt.outdir, cur.name)
      const fnOpt: Partial<BuildOptions> = {
        entryPoints: [resolve(cur.path, 'index')],
        outfile: resolve(outdir, 'index.js')
      }

      const config = mergeDefaultConfig(
        fnOpt,
        pick(cur.extra, PickKeys) as BuildOptions
      )
      if (opt.watch) {
        config.watch = true
      }
      acc.push(
        build(config).then(async (res) => {
          await copyConfigJson(cur.path, outdir)
          return res
        })
      )
      return acc
    }, [])
  )
  for (let i = 0; i < buildResultArray.length; i++) {
    const option = options[i]
    console.log(`${option.name}:\n`, buildResultArray[i])
  }
}
