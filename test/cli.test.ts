import fs from 'fs'
import path from 'path'
import execa from 'execa'
import { STCB_EXECUTABLE_PATH, esmProjectPath, fixturesPath } from './util'

test('default cli generate cloudbaserc.json ', async () => {
  process.chdir(esmProjectPath)
  await execa(STCB_EXECUTABLE_PATH, ['gen', '-dir', 'src']) // .stdout?.pipe(process.stdout)
  const flag = fs.existsSync(path.resolve(esmProjectPath, 'cloudbaserc.json'))
  expect(flag).toBe(true)
})

test('default build all ', async () => {
  process.chdir(esmProjectPath)
  await execa(STCB_EXECUTABLE_PATH, ['build']) // .stdout?.pipe(process.stdout)
  expect(true).toBe(true)
})

test('default build all with params', async () => {
  process.chdir(esmProjectPath)
  await execa(STCB_EXECUTABLE_PATH, [
    'build',
    '-srcdir',
    'src',
    '-outdir',
    'dist'
  ]) // .stdout?.pipe(process.stdout)
  expect(true).toBe(true)
})

test('default init project', async () => {
  process.chdir(fixturesPath)
  try {
    await execa(STCB_EXECUTABLE_PATH, ['init', 'ts-starter']) // .stdout?.pipe(process.stdout)
  } catch (error) {
    console.error(error)
  }

  expect(true).toBe(true)
})

test('default dev mode', async () => {
  process.chdir(fixturesPath)
  await execa(STCB_EXECUTABLE_PATH, ['dev']) // .stdout?.pipe(process.stdout)
  expect(true).toBe(true)
})
