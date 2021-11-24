import { initProject } from '@/index'
import { fixturesPath, resolve, remove } from './util'

describe('[Init] project', () => {
  const projectName = 'happy'
  const initProjectPath = resolve(fixturesPath, projectName)
  beforeEach(async () => {
    return await remove([initProjectPath])
  })
  test('default init project', async () => {
    process.chdir(fixturesPath)
    let result = false

    try {
      result = await initProject(projectName)
    } catch (error) {
      result = false
      console.error(error)
    }
    expect(result).toBe(true)
    const pkg = require(resolve(initProjectPath, 'package.json'))
    expect(pkg.name).toBe(projectName)
  })
})
