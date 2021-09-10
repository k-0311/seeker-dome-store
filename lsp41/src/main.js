const program = require('commander');
const chalk = require('chalk');
const { version } = require('../package.json')

program.command('open')
  .alias('op')
  .usage(chalk.yellowBright('[optiosn] <file ...>'))
  .option('-o, --output <path>', chalk.yellowBright('output dir path'))
  .action(cmd => {
    console.log(cmd)
  })

program.name('lsp').usage(chalk.yellowBright('<command> [options]'))
program.version(version, '-v, --version')
program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.Command.outputHelp(txt => chalk.green(txt))
}