import { sleep } from "./sleep";
import { createSpinner } from "nanospinner";
import { exec } from "child_process";

export async function installation() {
  const spinner = createSpinner("Installing hypur...").start();
  await sleep(500);
  exec("echo npm install @hypur/runtime", (error) => {
    if (error !== null) {
      spinner.error({ text: "Failed to install hypur" });
      process.exit(1);
    }
  });
  spinner.success({ text: "Hypur installed!" });
}
