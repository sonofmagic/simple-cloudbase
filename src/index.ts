import { getFunctions } from './util'
import { build } from './build/index'
import { mergeDefaultConfig } from './build/defaults'
import type { BuildOptions, BuildResult } from 'esbuild'
import path from 'path'
import pick from 'lodash/pick'
export interface IBuildPathOption {
  rootdir: string
  srcdir: string
  outdir: string
}

const PickKeys = [
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

export async function buildAll (opt: IBuildPathOption) {
  const options = await getFunctions(path.resolve(opt.rootdir, opt.srcdir))
  const res = await Promise.all([
    options.reduce<Promise<BuildResult>[]>((acc, cur) => {
      const fnOpt: Partial<BuildOptions> = {
        entryPoints: [path.resolve(cur.path, 'index')],
        outfile: path.resolve(opt.rootdir, opt.outdir, cur.name, 'index.js')
      }

      const config = mergeDefaultConfig(
        fnOpt,
        pick(cur.extra, PickKeys) as BuildOptions
      )
      acc.push(build(config))
      return acc
    }, [])
  ])
  console.log(res)
}
