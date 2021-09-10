const program = require('commander');
const ora = require('ora');

program
  .option('-t, --time <number>')
  .option('-m, --message <string>')
  .parse(process.argv)



const spinner = ora('正在加载中，请稍后 ...').start();

setTimeout(() => {
  spinner.stop();
  console.log(program.message);
}, program.time * 1000);