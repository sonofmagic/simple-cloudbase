import {
  getFunctions,
  PickKeys,
  copyConfigJson,
  resolve,
  log,
  copyPkgDeps,
  tryParsePkgJson
} from './util'
import { build } from './build/index'
import { mergeDefaultConfig } from './build/defaults'
import type { BuildOptions, BuildResult } from 'esbuild'
import type { IBuildPathOption } from './type'
import pick from 'lodash/pick'

export async function buildAll (opt: IBuildPathOption) {
  if (!opt.srcdir) {
    opt.srcdir = 'src'
  }
  if (!opt.outdir) {
    opt.outdir = 'dist'
  }
  const options = await getFunctions(resolve(opt.rootdir, opt.srcdir))
  const rootPkg: {
    dependencies?: Record<string, string>;
  } | null = tryParsePkgJson(opt.rootdir)
  if (!rootPkg) {
    log.error('root dir package.json not found')
  }

  const buildResultArray = await Promise.all(
    options.reduce<Promise<BuildResult>[]>((acc, cur) => {
      const outdir = resolve(opt.rootdir, opt.outdir as string, cur.name)
      const fnOpt: Partial<BuildOptions> = {
        entryPoints: [resolve(cur.path, 'index')],
        outfile: resolve(outdir, 'index.js')
      }
      const pkg = tryParsePkgJson(cur.path)
      const dependencies = Object.assign(
        {},
        rootPkg ? rootPkg.dependencies ?? {} : {},
        pkg ? pkg.dependencies ?? {} : {}
      )
      const depsKeys = Object.keys(dependencies)
      fnOpt.external = depsKeys

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
          if (depsKeys.length) {
            await copyPkgDeps(
              {
                name: cur.name,
                dependencies
              },
              outdir
            )
          }
          return res
        })
      )
      return acc
    }, [])
  )
  for (let i = 0; i < buildResultArray.length; i++) {
    const option = options[i]
    const buildResult = buildResultArray[i]

    log.success(`${option.name}:`)
    const warnings = buildResult.warnings
    if (warnings.length) {
      log.warn('warnings:')
      for (let j = 0; j < warnings.length; j++) {
        log.warn(warnings[j])
      }
    }
    const errors = buildResult.errors
    if (errors.length) {
      log.error('errors:')
      for (let k = 0; k < errors.length; k++) {
        log.error(errors[k])
      }
    }
  }
  return buildResultArray
}
