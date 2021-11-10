import { Command } from 'commander'
import { writeCloudbaserc } from './templete/cloudbaserc'
import { buildAll, initProject } from './index'
import { setDev, setProd } from './env'
import { log } from './util'
const { version } = require('../package.json')
const program = new Command()
program.version(version)
const cwd = process.cwd()
program
  .command('generate')
  .alias('gen')
  .description('generate cloudbaserc.json')
  .option('-dir [path]', 'the output functions dir')
  .action(async (args) => {
    let distDir
    if (args.Dir) {
      distDir = args.Dir
    }
    await writeCloudbaserc(cwd, distDir)
    log.success('Successfully generate cloudbaserc.json !')
  })

program
  .command('build')
  .description('build scf')
  .option('-srcdir [path]', 'the src functions dir')
  .option('-outdir [path]', 'the output functions dir')
  .action(async (args) => {
    const Outdir = args.Outdir
    const Srcdir = args.Srcdir
    setProd()
    await buildAll({
      outdir: Outdir || 'dist',
      rootdir: cwd,
      srcdir: Srcdir || 'src'
    })
  })

program
  .command('dev')
  .description('build and watch scf')
  .option('-srcdir [path]', 'the src functions dir')
  .option('-outdir [path]', 'the output functions dir')
  .action(async (args) => {
    const Outdir = args.Outdir
    const Srcdir = args.Srcdir
    setDev()
    await buildAll({
      outdir: Outdir || 'dist',
      rootdir: cwd,
      srcdir: Srcdir || 'src',
      watch: true
    })
  })

program
  .command('init')
  .description('init project')
  .argument('[path]', 'the project dir name')
  .action(async (path: string) => {
    await initProject(path)
  })

program.parse(process.argv)
