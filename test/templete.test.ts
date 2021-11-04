import { writeCloudbaserc } from '@/templete/cloudbaserc'
import path from 'path'
import fs from 'fs'
const nativeProjectPath = path.resolve(__dirname, 'fixtures/native')

test('generate cloudbaserc.json templete ', async () => {
  await writeCloudbaserc(nativeProjectPath, 'src')
  const flag = fs.existsSync(path.resolve(nativeProjectPath, 'cloudbaserc.json'))
  expect(flag).toBe(true)
})
