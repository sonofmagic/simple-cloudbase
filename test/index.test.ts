import { buildAll } from '../src/index'
import {
  esmProjectPath,
  nativeProjectPath,
  remove,
  fsExists,
  nativedist,
  esmdist
} from './util'

describe('[Build] build project', () => {
  beforeAll(async () => {
    return await remove([nativedist, esmdist])
  })
  test('default nativeProject buildAll ', async () => {
    expect(fsExists(nativedist)).toBe(false)
    const arr = await buildAll({
      rootdir: nativeProjectPath,
      srcdir: 'src',
      outdir: 'dist'
    })
    expect(fsExists(nativedist)).toBe(true)
    arr.forEach((x) => {
      expect(x.warnings.length).toBe(0)
      expect(x.errors.length).toBe(0)
    })
  })

  test('default esmProject buildAll ', async () => {
    expect(fsExists(esmdist)).toBe(false)
    const arr = await buildAll({
      rootdir: esmProjectPath,
      srcdir: 'src',
      outdir: 'dist'
    })
    expect(fsExists(esmdist)).toBe(true)
    arr.forEach((x) => {
      expect(x.warnings.length).toBe(0)
      expect(x.errors.length).toBe(0)
    })
  })
})
