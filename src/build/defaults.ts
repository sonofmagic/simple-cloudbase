import { resolve } from '../util'
import { isDev, isProd } from '../env'
import type { BuildOptions } from 'esbuild'

export function getDefaultConfig (): BuildOptions {
  const cwd = process.cwd()
  return {
    entryPoints: ['./src/index.js'],
    bundle: true,
    platform: 'node',
    target: ['node12'], // scf runtime node version
    outfile: resolve(cwd, 'dist', 'index.js'),
    sourcemap: isDev(), // 调试用
    minify: isProd(), // 压缩代码
    external: [] // 跳过打包
  }
}

export function mergeDefaultConfig (...configs: BuildOptions[]): BuildOptions {
  return Object.assign(getDefaultConfig(), ...configs)
}
