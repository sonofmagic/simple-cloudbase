import path from 'path'
import fs from 'fs'
import del from 'del'
export function resolve (...pathSegments: string[]) {
  return path.resolve(...pathSegments)
}

export const nativeProjectPath = resolve(__dirname, 'fixtures/native')

export const nativeProjectCloudbasercPath = resolve(
  nativeProjectPath,
  'cloudbaserc.json'
)

export const esmProjectPath = resolve(__dirname, 'fixtures/esm')

export const esmProjectCloudbasercPath = resolve(
  esmProjectPath,
  'cloudbaserc.json'
)

export const nativedist = resolve(nativeProjectPath, 'dist')
export const esmdist = resolve(esmProjectPath, 'dist')

export const STCB_EXECUTABLE_PATH = resolve(__dirname, '../bin/stcb')

export const fixturesPath = resolve(__dirname, 'fixtures')

export const tsProjectPath = resolve(__dirname, 'fixtures/ts-starter')

export function fsExists (pathLike: fs.PathLike) {
  return fs.existsSync(pathLike)
}

export function remove (
  patterns: string | readonly string[],
  options?: del.Options
) {
  return del(patterns, { force: true, ...options })
}
