const fs = require("fs");
const path = require("path");
const { NodeSSH } = require("node-ssh");

const privateKeyPath = "/Users/wangshangwen/.ssh/tenyun.pem";
const ssh = new NodeSSH();

async function main() {
  const conn = await ssh.connect({
    host: "1.15.61.169",
    username: "root",
    privateKeyPath: privateKeyPath,
  });

  const resp = await conn.exec("ls", ["-la"], {
    cwd: "/",
    stream: "stdout",
    options: { pty: true },
  });

  console.log(resp);
}

main().catch((ex) => console.log(ex));
