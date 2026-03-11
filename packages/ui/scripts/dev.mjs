import { spawn } from "node:child_process";

const children = [
  spawn("npm", ["run", "dev:styles"], { stdio: "inherit", shell: true }),
  spawn("npm", ["run", "dev:components"], { stdio: "inherit", shell: true }),
];

const shutdown = (code = 0) => {
  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }
  process.exit(code);
};

for (const child of children) {
  child.on("exit", (code) => {
    if (code && code !== 0) {
      shutdown(code);
    }
  });
}

process.on("SIGINT", () => shutdown());
process.on("SIGTERM", () => shutdown());
