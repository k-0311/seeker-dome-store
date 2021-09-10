#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');
const ora = require('ora');
const node_ssh = require('node-ssh');
const archiver = require('archiver');
const { successLog, errorLog, underlineLog, warnLog, request } = require('../utils/index');

const projectDir = process.cwd();

let ssh = new node_ssh(); // 生成ssh实例

// 部署流程入口
async function deploy(config) {
  const { script, webDir, distPath, projectName, name, robot } = config;
  let isError = false;
  try {
    // execBuild(script);
    // get user name
    var gitUserName
    gitUserName = childProcess.execSync('git config user.name', { cwd: projectDir })
    if (gitUserName) {
      gitUserName = gitUserName.toString()
    }
    try {
      await request(`${gitUserName}构建${projectName}${name}开始！`, robot);
      console.log(`\n（1）${script}`);
      const spinner = ora('正在打包中');
      spinner.start();
      var workerProcess = childProcess.exec(script, { cwd: projectDir }, async () => {
        spinner.stop();
        if (isError) {
          errorLog('  打包失败,请查看错误信息!')
          await request(`${projectName}${name}构建失败，请检查失败原因！`, robot);
          process.exit(1);
        }
        successLog('  打包成功');
        await startZip(distPath);
        await connectSSH(config);
        await uploadFile(projectName, webDir);
        await unzipFile(webDir, projectName);
        await deleteLocalZip();
        successLog(`\n 恭喜您，${underlineLog(projectName)}项目${underlineLog(name)}部署成功了^_^\n`);
        await request(`${projectName}${name}构建完成！`, robot);
        process.exit(0);
      });
      workerProcess.stdout.on('data', function (data) {
        // console.log('\n'+ data);
        if (data.includes('errors') || data.includes('error')) {
          errorLog('\n '+ data);
        } else if (data.includes('warning')) {
          warnLog('\n '+ data);
        } else {
          console.log('\n'+ data);
        }
        if(data.includes('Build failed with errors') || data.includes('npm ERR!') || data.includes('Failed to compile')) {
          isError = true
        }
        if (data.includes('DONE  Build complete')) {
          isError = false
        }
      });

      workerProcess.stderr.on('data', function (data) {
        if (data.includes('errors') || data.includes('error') || data.includes('ERR!') || data.includes('Failed at')) {
          errorLog('\n '+ data);
        } else {
          console.log('\n'+ data);
        }

      });
    } catch (err) {
      errorLog(err);
      await request(`${projectName}${name}构建失败，请检查失败原因！`, robot);
      process.exit(1);
    }

  } catch (err) {
    errorLog(`  部署失败 ${err}`);
    process.exit(1);
  }
}

// 第一步，执行打包脚本
function execBuild(script) {
  try {
    console.log(`\n（1）${script}`);
    const spinner = ora('正在打包中');
    spinner.start();
    console.log();
    childProcess.execSync(script, { cwd: projectDir });
    // var workerProcess = childProcess.exec(script, { cwd: projectDir }, () => {
    //   console.log('ddd')
    // });
    // workerProcess.stdout.on('data', function (data) {
    //   console.log('stdout: ' + data);
    // });
    //
    // workerProcess.stderr.on('data', function (data) {
    //   console.log('stderr: ' + data);
    // });
    spinner.stop();
    successLog('  打包成功');
  } catch (err) {
    errorLog(err);
    process.exit(1);
  }
}

// 第二部，打包zip
function startZip(distPath) {
  return new Promise((resolve, reject) => {
    distPath = path.resolve(projectDir, distPath);
    console.log('（2）打包成zip');
    const archive = archiver('zip', {
      zlib: { level: 9 },
    }).on('error', err => {
      throw err;
    });
    const output = fs.createWriteStream(`${projectDir}/dist.zip`);
    output.on('close', err => {
      if (err) {
        errorLog(`  关闭archiver异常 ${err}`);
        reject(err);
        process.exit(1);
      }
      successLog('  zip打包成功');
      resolve();
    });
    archive.pipe(output);
    archive.directory(distPath, '/');
    archive.finalize();
  });
}

// 第三步，连接SSH
async function connectSSH(config) {
  const { host, port, username, password, privateKey, passphrase, distPath } = config;
  const sshConfig = {
    host,
    port,
    username,
    password,
    privateKey,
    passphrase
  };
  try {
    console.log(`（3）连接${underlineLog(host)}`);
    await ssh.connect(sshConfig);
    successLog('  SSH连接成功');
  } catch (err) {
    errorLog(`  连接失败 ${err}`);
    process.exit(1);
  }
}

// 第四部，上传zip包
async function uploadFile(projectName, webDir) {
  try {
    let date = new Date()
    let month = parseInt(date.getMonth()) + 1 > 9 ? parseInt(date.getMonth()) + 1 : '0' + (parseInt(date.getMonth()) + 1)
    let day = parseInt(date.getDate()) > 9 ? date.getDate() : '0' + date.getDate()
    let hours = parseInt(date.getHours()) > 9 ? date.getHours() : '0' + date.getHours()
    let minutes = parseInt(date.getMinutes()) > 9 ? date.getMinutes() : '0' + date.getMinutes()
    let dateNew = `${date.getFullYear()}-${month}-${day}_${hours}${minutes}`

    const lastDir = webDir && webDir.split(projectName)[0]
    console.log(`（4）备份${projectName}为 ${projectName}${dateNew}`);

    await ssh.execCommand(`cd ${lastDir}`, { cwd: lastDir });
    await ssh.execCommand(`cp -rf ${projectName} ${projectName}${dateNew}`, { cwd: lastDir });
    await ssh.execCommand(`mv ${projectName} ${projectName}000 && mkdir ${projectName}`, { cwd: lastDir }); // 把原来的命名projectName000 在创建一个projectName空文件夹
    successLog(`  备份成功名字为：${projectName}${dateNew}`);

    console.log(`（5）上传zip至目录${underlineLog(webDir)}`);
    await ssh.putFile(`${projectDir}/dist.zip`, `${webDir}/dist.zip`);
    successLog('  zip包上传成功');
  } catch (err) {
    errorLog(`  zip包上传失败 ${err}`);
    process.exit(1);
  }
}


// 运行命令
async function runCommand(command, webDir) {
  await ssh.execCommand(command, { cwd: webDir });
}

// 第五步，解压zip包
async function unzipFile(webDir, projectName) {
  const lastDir = webDir && webDir.split(projectName)[0]
  try {
    console.log('（6）开始解压zip包');
    await runCommand(`cd ${webDir}`, webDir);
    // await runCommand(`rm -rf ${projectName}`, webDir);
    // await runCommand(`mv ${projectName} ${projectName}000`, lastDir);
    // console.log(`备份${projectName}为${projectName}000`)
    // console.log(` 删除原来的文件成功${projectName})
    await runCommand(`unzip -o dist.zip && rm -f dist.zip`, webDir);
    await runCommand(`rm -rf ${projectName}000`, lastDir); // 解压成功删除临时备份projectName000
    successLog('  zip包解压成功');
  } catch (err) {
    errorLog(`  zip包解压失败 ${err}`);
    await runCommand(`rm -rf ${projectName}`, lastDir);
    await runCommand(`mv ${projectName}000 ${projectName}`, lastDir);
    process.exit(1);
  }
}

// 第六步，删除本地dist.zip包
async function deleteLocalZip() {
  return new Promise((resolve, reject) => {
    console.log('（7）开始删除本地zip包');
    fs.unlink(`${projectDir}/dist.zip`, err => {
      if (err) {
        errorLog(`  本地zip包删除失败 ${err}`, err);
        reject(err);
        process.exit(1);
      }
      successLog('  本地zip包删除成功\n');
      resolve();
    });
  });
}


module.exports = deploy;
