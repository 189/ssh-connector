const fs = require("fs");
const path = require("path");
const { NodeSSH } = require("node-ssh");

const privateKeyPath = "/Users/wangshangwen/.ssh/shangwen";
const ssh = new NodeSSH();

async function main() {
  const conn = await ssh.connect({
    host: "44.242.167.2",
    username: "ubuntu",
    privateKeyPath: privateKeyPath,
  });

  const resp = await ssh.exec("ls", ["-la"], {
    cwd: "/",
    stream: "stdout",
    options: { pty: true },
  });

  console.log(resp);
}

main().catch((ex) => console.log(ex));
