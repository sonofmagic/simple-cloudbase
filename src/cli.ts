import { Command } from 'commander'
const { version } = require('../package.json')

const program = new Command()
program.version(version)

program
  .option('-gen, --generate', 'generate cloudbaserc.json')

program.parse(process.argv)

const options = program.opts()

console.log(options)
