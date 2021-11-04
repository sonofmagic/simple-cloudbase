import { Command } from 'commander'
import { writeCloudbaserc } from './templete/cloudbaserc'
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

program.parse(process.argv)

// const options = program.opts()

// console.log(options)

// if (options.generate) {
//   writeCloudbaserc(cwd)
// }
