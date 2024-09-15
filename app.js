const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");
const { NodeSSH } = require("node-ssh");

const privateKeyPath = "/Users/wangshangwen/.ssh/tenyun.pem";
const ssh = new NodeSSH();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const serverLoginOpt = {
  host: "1.15.61.169",
  username: "root",
  privateKeyPath: privateKeyPath,
};

async function main() {
  const { host, username } = serverLoginOpt;
  console.log(`Connected to the server, ${host}, ${username}`);
  try {
    const conn = await ssh.connect(serverLoginOpt);
    promptForCommand(conn);
  } catch (ex) {
    console.error("Failed to connect:", err);
  }
}

function promptForCommand(conn) {
  rl.question("$ ", (command) => {
    if (command.trim().toLowerCase() === "exit") {
      rl.close();
      ssh.dispose();
      console.log("Disconnected from the server");
      return;
    }

    conn
      .execCommand(command)
      .then((result) => {
        const { stdout, stderr } = result;
        if (stderr) {
          console.error(stderr);
        } else {
          console.log(stdout);
        }
        promptForCommand(conn);
      })
      .catch((err) => {
        console.error("Command execution error:", err);
        promptForCommand(conn);
      });
  });
}

main().catch((ex) => console.log(ex));
