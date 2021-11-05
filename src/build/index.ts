import { build as innerBuild } from 'esbuild'
import type { BuildOptions } from 'esbuild'

export async function build (config: BuildOptions) {
  return await innerBuild(config)
}

export async function watch (config: BuildOptions) {
  config.watch = true
  return await innerBuild(config)
}
