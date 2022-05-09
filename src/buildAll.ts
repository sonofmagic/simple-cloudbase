import {
  getFunctions,
  PickKeys,
  copyConfigJson,
  resolve,
  log,
  copyPkgDeps
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
  let pkg: {
    dependencies?: Record<string, string>;
  } | null = null
  try {
    pkg = require(resolve(opt.rootdir, 'package.json'))
  } catch (error) {
    log.error('package.json not found')
  }

  const buildResultArray = await Promise.all(
    options.reduce<Promise<BuildResult>[]>((acc, cur) => {
      const outdir = resolve(opt.rootdir, opt.outdir as string, cur.name)
      const fnOpt: Partial<BuildOptions> = {
        entryPoints: [resolve(cur.path, 'index')],
        outfile: resolve(outdir, 'index.js')
      }
      if (pkg) {
        fnOpt.external = pkg.dependencies ? Object.keys(pkg.dependencies) : []
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
          if (pkg && pkg.dependencies) {
            await copyPkgDeps(
              {
                name: cur.name,
                dependencies: pkg.dependencies
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
