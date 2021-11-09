import { initProject } from '../src/index'
import { fixturesPath } from './util'
import del from 'del'
test('default init project', async () => {
  process.chdir(fixturesPath)
  let result = false

  try {
    await del(['happy'])
    result = await initProject('happy')
  } catch (error) {
    result = false
    console.error(error)
  }
  expect(result).toBe(true)
})
