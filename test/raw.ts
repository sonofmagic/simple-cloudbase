import { initProject } from '../src/init'
import { fixturesPath } from './util'
;(async () => {
  try {
    process.chdir(fixturesPath)
    await initProject('new-boy-start')
  } catch (error) {
    console.error(error)
  }
})()
