import { promises as fs } from 'fs'
import path from 'path'
import { log } from './util'
async function extractNodeModules (dependencies: string[], cwd = process.cwd()) {
  const tempDir = path.resolve(cwd, '.stcb')
  try {
    await fs.access(tempDir)
  } catch (error) {
    log.success(
      'create temp dir [.stcb] , you should add this dir to your .gitignore'
    )
    await fs.mkdir(tempDir)
  }
  // TODO
}

export { extractNodeModules }
