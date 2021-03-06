const Fs = require("fs");
const Path = require("path");
const Https = require("https");
const Url = require("url");

const Chalk = require("chalk");
const Figures = require("figures");
const Ora = require("ora");

const TINYIMG_URL = [
  "tinyjpg.com",
  "tinypng.com"
];

function RandomHeader () {
  const ip = new Array(4).fill(0).map(() => parseInt(Math.random() * 255)).join(".");
  const index = Math.floor(Math.random() * 2);
  return {
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
      "Postman-Token": Date.now(),
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
      "X-Forwarded-For": ip
    },
    hostname: TINYIMG_URL[index],
    method: "POST",
    path: "/web/shrink",
    rejectUnauthorized: false
  };
}

function UploadImg (file) {
  const opts = RandomHeader();
  return new Promise((resolve, reject) => {
    const req = Https.request(opts, res => res.on("data", data => {
      const obj = JSON.parse(data.toString());
      obj.error ? reject(obj.message) : resolve(obj);
    }));
    req.write(file, "binary");
    req.on("error", e => reject(e));
    req.end();
  });
}

function DownloadImg (url) {
  const opts = new Url.URL(url);
  return new Promise((resolve, reject) => {
    const req = Https.request(opts, res => {
      let file = "";
      res.setEncoding("binary");
      res.on("data", chunk => file += chunk);
      res.on("end", () => resolve(file));
    });
    req.on("error", e => reject(e));
    req.end();
  });
}

async function CompressImg (path) {
  try {
    const file = Fs.readFileSync(path, "binary");
    const obj = await UploadImg(file);
    const data = await DownloadImg(obj.output.url);
    const dpath = Path.join("img", Path.basename(path));
    Fs.writeFileSync(dpath, data, "binary");

    const oldSize = Chalk.redBright(obj.input.size);
    const newSize = Chalk.greenBright(obj.output.size);
    const ratio = Chalk.blueBright(obj.output.ratio);
    const msg = `${Figures.tick} Compressed [${Chalk.yellowBright(path)}] completed: Old Size ${oldSize}, New Size ${newSize}, Optimization Ratio ${ratio}`;
    return Promise.resolve(msg);
  } catch (err) {
    const msg = `${Figures.cross} Compressed [${Chalk.yellowBright(path)}] failed: ${Chalk.redBright(err)}`;
    return Promise.resolve(msg);
  }
}


(async () => {
  const spinner = Ora("Image is compressing......").start();
  const res = await CompressImg("old/123.jpg");
  spinner.stop();
  // console.log(res);
})();