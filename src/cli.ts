import { Command } from 'commander'
import { writeCloudbaserc } from './templete/cloudbaserc'
import { buildAll } from './index'
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
    console.log('Successfully generate cloudbaserc.json')
  })

program
  .command('build')
  .description('build scf')
  .option('-srcdir [path]', 'the src functions dir')
  .option('-outdir [path]', 'the output functions dir')
  .action(async (args) => {
    const Outdir = args.Outdir
    const Srcdir = args.Srcdir

    await buildAll({
      outdir: Outdir || 'dist',
      rootdir: cwd,
      srcdir: Srcdir || 'src'
    })
  })

program.parse(process.argv)
