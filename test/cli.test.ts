import fs from 'fs'
import path from 'path'
import execa from 'execa'

const EXECUTABLE_PATH = path.resolve(__dirname, '../bin/stcb')

const esmProjectPath = path.resolve(__dirname, 'fixtures/esm')

test('default cli generate cloudbaserc.json ', async () => {
  process.chdir(esmProjectPath)
  await execa(EXECUTABLE_PATH, ['gen', '-dir', 'src'])// .stdout?.pipe(process.stdout)
  const flag = fs.existsSync(path.resolve(esmProjectPath, 'cloudbaserc.json'))
  expect(flag).toBe(true)
})
