import { buildAll } from '../src/index'
import { esmProjectPath, nativeProjectPath } from './util'
test('default nativeProject buildAll ', async () => {
  await buildAll({
    rootdir: nativeProjectPath,
    srcdir: 'src',
    outdir: 'dist'
  })
  expect(true).toBe(true)
})

test('default esmProject buildAll ', async () => {
  await buildAll({
    rootdir: esmProjectPath,
    srcdir: 'src',
    outdir: 'dist'
  })
  expect(true).toBe(true)
})
