import esbuild from 'esbuild'
import type { BuildOptions } from 'esbuild'
import path from 'path'
import { isDev, isProd } from '@/env'
import merge from 'lodash/merge'
function getDefaultConfig (): BuildOptions {
  const cwd = process.cwd()
  return {
    entryPoints: ['./src/index.js'],
    bundle: true,
    platform: 'node',
    target: ['node12'], // scf runtime node version
    outfile: path.resolve(cwd, 'dist', 'index.js'),
    sourcemap: isDev, // 调试用
    minify: isProd, // 压缩代码
    external: [] // 跳过打包
  }
}

export async function build (config: BuildOptions) {
  await esbuild.build(merge(getDefaultConfig(), config))
}

export async function watch (config: BuildOptions) {
  const option = merge(getDefaultConfig(), config)
  option.watch = true
  await build(option)
}
